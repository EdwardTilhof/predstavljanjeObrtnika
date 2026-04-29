import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Table, Badge, Button, Stack, Pagination, Form, Row, Col, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import CooperatingPartnerLogic from "../../components/partners/CooperatingPartnersLogic";
import DeleteConfirmationModal from "../../crossPageComponents/modal/DeleteConfirmationModal";
import { ROLE_RANKS } from "../../Permissions/PermissonsConst";
import dataFacade from "../../services/dataFacade";

// PDF Imports
import { PDFDownloadLink } from "@react-pdf/renderer";
import PartnerPdfTemplate from "../../crossPageComponents/pdfRenderer/PartnerPdfTemplate";

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
  }, [setPartners]);

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
      if (sortConfig.key === 'original') { // Original order based on the default list
        const indexA = partners.indexOf(a);
        const indexB = partners.indexOf(b);
        return sortConfig.direction === 'asc' ? indexA - indexB : indexB - indexA;
      }

      let aVal = a[sortConfig.key] || "";
      let bVal = b[sortConfig.key] || "";

      // Specific logic for sorting by Category Name
      if (sortConfig.key === 'category') {
        aVal = allCategories.find(c => String(c.id) === String(a.category))?.name || "";
        bVal = allCategories.find(c => String(c.id) === String(b.category))?.name || "";
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      if (aVal === bVal) { return sortConfig.direction === 'asc' ? 0 : 0; }
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
        await dataFacade.deletePartner(targetPartner.id); // Centralized
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
      <Row className="mb-3">
        <Col md={4}>
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
      </Row>

      <Table hover responsive className="shadow-sm border">
        <thead className="table-light">
          <tr>

            <th title={
              sortConfig.key === 'original'
                ? (sortConfig.direction === 'asc' ? 'Ascending' : 'Descending')
                : 'Click to sort'
            }
              onClick={() => handleSort('company')} style={{ cursor: 'pointer' }}>
              Company {sortConfig.key === 'company' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th title={
              sortConfig.key === 'original'
                ? (sortConfig.direction === 'asc' ? 'Ascending' : 'Descending')
                : 'Click to sort'
            }
              onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
              Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Regions</th>
            <th>Contact</th>
            {userRank >= ROLE_RANKS.GUEST &&
              <th title={
                sortConfig.key === 'original'
                  ? (sortConfig.direction === 'asc' ? 'Ascending' : 'Descending')
                  : 'Click to sort'
              }
                onClick={() => handleSort('original')} style={{ cursor: 'pointer' }}>
                Action {sortConfig.key === 'original' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>}
            {userRank >= ROLE_RANKS.MODERATOR &&
              <th title={
                sortConfig.key === 'original'
                  ? (sortConfig.direction === 'asc' ? 'Ascending' : 'Descending')
                  : 'Click to sort'
              }
                onClick={() => handleSort('importanceValue')} style={{ cursor: 'pointer' }}>
                importanceValue {sortConfig.key === 'importanceValue' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
            }
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((partner) => {
            const categoryName = allCategories.find(
              (cat) => String(cat.id) === String(partner.category)
            )?.name || "N/A";

            const regionNames = partner.regions
              ?.map((regId) => allRegions.find((r) => String(r.id) === String(regId))?.name)
              .filter(Boolean) || ["Global"];

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
                      <Button
                        as={Link}
                        to={ROUTES.LOGIN}
                        variant="outline-primary"
                        size="sm"
                      >
                        Login to view PDF
                      </Button>
                    )}
                    {/* PDF Render logic */}
                    {userRank >= ROLE_RANKS.USER && (
                      <PDFDownloadLink
                        document={
                          <PartnerPdfTemplate
                            partner={partner}
                            categoryName={categoryName}
                            regionNames={regionNames}
                          />
                        }
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
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => navigate(ROUTES.EditPartner.replace(':id', partner.id))}                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            setTargetPartner(partner);
                            setShowModal(true);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </>
                    )}
                  </Stack>
                </td>
                {userRank >= ROLE_RANKS.MODERATOR &&
                  <td>{partner.importanceValue}</td>
                }
              </tr>
            );
          })}
        </tbody>
      </Table >

      {/* Pagination Controls */}
      {
        totalPages > 1 && (
          <Pagination className="justify-content-center mt-4">
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />

            {(() => {
              const items = [];
              const leftSide = 1;
              const rightSide = totalPages;

              let startPage = Math.max(1, currentPage - 1);
              let endPage = Math.min(totalPages, currentPage + 1);

              items.push(
                <Pagination.Item key={1} active={1 === currentPage} onClick={() => setCurrentPage(1)}>
                  1
                </Pagination.Item>
              );

              if (startPage > 2) {
                items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
              }

              for (let i = startPage; i <= endPage; i++) {
                if (i !== 1 && i !== totalPages) {
                  items.push(
                    <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
                      {i}
                    </Pagination.Item>
                  );
                }
              }

              if (endPage < totalPages - 1) {
                items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
              }

              if (totalPages > 1) {
                items.push(
                  <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => setCurrentPage(totalPages)}>
                    {totalPages}
                  </Pagination.Item>
                );
              }

              return items;
            })()}

            <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        )
      }

      {
        userRank >= ROLE_RANKS.MODERATOR && (
          <Button variant="primary" className="mt-3" onClick={() => navigate(ROUTES.newCooperatingPartner)}>
            Add New Partner
          </Button>
        )
      }

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