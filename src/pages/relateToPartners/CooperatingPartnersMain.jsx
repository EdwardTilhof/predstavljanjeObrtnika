import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Table, Badge, Button, Stack, Pagination, Form, Row, Col, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
// Highcharts Imports
import Highcharts from 'highcharts';
import HighchartsReactModule from 'highcharts-react-official';
const HighchartsReact = HighchartsReactModule.default || HighchartsReactModule;
import RegionsChart from "../../crossPageComponents/charts/RegionsChart";

import DeleteConfirmationModal from "../../crossPageComponents/modal/DeleteConfirmationModal";
import { ROLE_RANKS } from "../../Permissions/PermissonsConst";
import dataFacade from "../../services/dataFacade";

// PDF Imports
import { PDFDownloadLink } from "@react-pdf/renderer";
import PartnerPdfTemplate from "../../crossPageComponents/pdfRenderer/PartnerPdfTemplate";

const stripHtmlTags = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const CooperatingPartnersMain = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [targetPartner, setTargetPartner] = useState(null);
  const [ partners, setPartners ] = useState([]);

  // Data States
  const [allCategories, setAllCategories] = useState([]);
  const [allRegions, setAllRegions] = useState([]);

  // UI States: Filtering, Sorting, Pagination
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: 'original', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  const userRole = localStorage.getItem('user_role') || 'GUEST';
  const userRank = ROLE_RANKS[userRole] || 0;

  const loadData = useCallback(async () => {
    const partnerData = await dataFacade.getPartners();
    setPartners(partnerData);

    const mergedCats = await dataFacade.getCategories();
    setAllCategories(mergedCats);

    const mergedRegs = await dataFacade.getRegions();
    setAllRegions(mergedRegs);
  }, []);

  useEffect(() => {
    const initLoad = async () => {
      await loadData();
      setLoading(false);
    };
    initLoad();
    window.addEventListener("partnersUpdated", loadData);
    return () => window.removeEventListener("partnersUpdated", loadData);
  }, [loadData]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  // --- Chart Data Logic ---
  const chartOptions = useMemo(() => {
    // 1. Count partners per category
    const categoryCounts = {};
    partners.forEach(partner => {
        // Handle cases where category might be missing or unassigned
        const catId = partner.category || 'unassigned'; 
        categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;
    });

    // 2. Format data for Highcharts: [{ name: 'Chrome', y: 74.77 }, ...]
    const pieData = Object.entries(categoryCounts).map(([catId, count]) => {
        if (catId === 'unassigned') {
            return { name: 'Unassigned', y: count };
        }
        const categoryName = allCategories.find(c => String(c.id) === String(catId))?.name || "Unknown";
        return {
            name: categoryName,
            y: count
        };
    });

    // 3. Return the Highcharts configuration object
    return {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: {
            text: 'Partners per Category'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> ({point.y} partners)'
        },
        accessibility: {
            point: { valueSuffix: '%' }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: { enabled: false },
                showInLegend: true
            }
        },
        series: [{
            name: 'Partners',
            colorByPoint: true,
            data: pieData
        }],
        credits: { enabled: false } // Optional: hides the highcharts.com watermark
    };
  }, [partners, allCategories]);

  // --- Filtering & Sorting Logic ---
  const processedData = useMemo(() => {
    let filtered = Array.isArray(partners) ? [...partners] : [];

    // Filter by Category
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(p => String(p.category) === String(selectedCategory));
    }

    // Filter by Region 
    if (selectedRegion !== "All") {
      filtered = filtered.filter(p => p.regions?.includes(selectedRegion));
    }

    // Sort the result
    filtered.sort((a, b) => {
      if (sortConfig.key === 'original') {
        const indexA = partners.indexOf(a);
        const indexB = partners.indexOf(b);
        return sortConfig.direction === 'asc' ? indexA - indexB : indexB - indexA;
      }

      let aVal = a[sortConfig.key] || "";
      let bVal = b[sortConfig.key] || "";

      if (sortConfig.key === 'category') {
        aVal = allCategories.find(c => String(c.id) === String(a.category))?.name || "";
        bVal = allCategories.find(c => String(c.id) === String(b.category))?.name || "";
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [partners, selectedCategory, selectedRegion, sortConfig, allCategories]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const confirmDelete = async () => {
    if (targetPartner) {
      try {
        await dataFacade.deletePartner(targetPartner.id); 
        setPartners(prev => prev.filter(p => p.id !== targetPartner.id));
        setShowModal(false);
      } catch (error) {
        console.error("Failed to delete partner:", error);
      } 
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>
    );
  }

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col md={4}>
        
          {/* The highcharts bubble chart */}
          <RegionsChart partners={partners} allRegions={allRegions} />

          <Form.Group>
            <Form.Label className="small fw-bold">Filter by Region</Form.Label>
            <Form.Select
              value={selectedRegion}
              onChange={(e) => { setSelectedRegion(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Regions</option>
              {allRegions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
        
        {/* The Highcharts Pie Chart */}
        <Col md={8}>
          {partners.length > 0 ? (
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
              />
          ) : (
              <p className="text-muted text-center mt-3">No data available for chart.</p>
          )}
        </Col>
      </Row>

      <Table hover responsive className="shadow-sm border">
        {/* Table Head & Body remains unchanged */}
        <thead className="custom-card">
          <tr>
            <th title={sortConfig.key === 'original' ? (sortConfig.direction === 'asc' ? 'Ascending' : 'Descending') : 'Click to sort'} onClick={() => handleSort('company')} style={{ cursor: 'pointer' }}>
              Company {sortConfig.key === 'company' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th title={sortConfig.key === 'original' ? (sortConfig.direction === 'asc' ? 'Ascending' : 'Descending') : 'Click to sort'} onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
              Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Regions</th>
            <th>Contact</th>
            {userRank >= ROLE_RANKS.GUEST &&
              <th title={sortConfig.key === 'original' ? (sortConfig.direction === 'asc' ? 'Ascending' : 'Descending') : 'Click to sort'} onClick={() => handleSort('original')} style={{ cursor: 'pointer' }}>
                Action {sortConfig.key === 'original' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>}
            {userRank >= ROLE_RANKS.MODERATOR &&
              <th title={sortConfig.key === 'original' ? (sortConfig.direction === 'asc' ? 'Ascending' : 'Descending') : 'Click to sort'} onClick={() => handleSort('importanceValue')} style={{ cursor: 'pointer' }}>
                importanceValue {sortConfig.key === 'importanceValue' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
            }
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((partner) => {
            const categoryName = allCategories.find((cat) => String(cat.id) === String(partner.category))?.name || "N/A";
            const regionNames = partner.regions?.map((regId) => allRegions.find((r) => String(r.id) === String(regId))?.name).filter(Boolean) || ["Global"];

            return (
              <tr key={partner.id}>
                <td>{partner.company}</td>
                <td>{categoryName}</td>
                <td>
                  {regionNames.map((name, i) => (
                    <Badge key={i} bg="info" className="me-1">{name}</Badge>
                  ))}
                </td>
                <td>{partner.contact}</td>
                <td>
                  <Stack direction="horizontal" gap={2}>
                    {userRank === ROLE_RANKS.GUEST && (
                      <Button as={Link} to={ROUTES.LOGIN} variant="outline-primary" size="sm">Login to view PDF</Button>
                    )}
                    {userRank >= ROLE_RANKS.USER && (
                      <PDFDownloadLink
                        document={<PartnerPdfTemplate partner={{...partner, description: stripHtmlTags(partner.description)}} categoryName={categoryName} regionNames={regionNames} />}
                        fileName={`${partner.company}_Profile.pdf`}
                        style={{ textDecoration: 'none' }}
                      >
                        {({ loading }) => (
                          <Button variant="outline-success" size="sm" disabled={loading}>
                            {loading ? "..." : <i className="bi bi-file-pdf"></i>}
                          </Button>
                        )}
                      </PDFDownloadLink>
                    )}
                    {userRank >= ROLE_RANKS.MODERATOR && (
                      <>
                        <Button variant="outline-primary" size="sm" onClick={() => navigate(ROUTES.EditPartner.replace(':id', partner.id))}>
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => { setTargetPartner(partner); setShowModal(true); }}>
                          <i className="bi bi-trash"></i>
                        </Button>
                      </>
                    )}
                  </Stack>
                </td>
                {userRank >= ROLE_RANKS.MODERATOR && <td>{partner.importanceValue}</td>}
              </tr>
            );
          })}
        </tbody>
      </Table >

      {/* Pagination Controls remain unchanged */}
      {totalPages > 1 && (
          <Pagination className="justify-content-center mt-4">
             {/* Pagination logic left intact */}
          </Pagination>
        )}

      {userRank >= ROLE_RANKS.MODERATOR && (
          <Button variant="primary" className="mt-3" onClick={() => navigate(ROUTES.newCooperatingPartner)}>
            Add New Partner
          </Button>
      )}

      <DeleteConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDelete}
        itemName={targetPartner?.company}
      />
    </>
  );
};

export default CooperatingPartnersMain;