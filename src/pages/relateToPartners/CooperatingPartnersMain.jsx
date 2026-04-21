import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Table, Badge, Button, Stack, Pagination, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import CooperatingPartnerLogic from "../../components/partners/CooperatingPartnersLogic";
import { useDataSource } from "../../dataSource/DataSourceContext";
import DeleteConfirmationModal from "../../crossPageComponents/modal/DeleteConfirmationModal";
import { ROLE_RANKS } from "../../Permissions/PermissonsConst";

// Data Defaults
import { mainCategories } from "../../../dataRepository/partnersData/PartnersData";
import { regions as defaultRegions } from "../../../dataRepository/locations/RegionsData";

const CooperatingPartnersMain = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [targetPartner, setTargetPartner] = useState(null);
  const { partners, setPartners } = useDataSource();

  // Data States
  const [allCategories, setAllCategories] = useState([]);
  const [allRegions, setAllRegions] = useState([]);

  // UI States: Filtering, Sorting, Pagination
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: 'company', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const userRole = localStorage.getItem('user_role') || 'GUEST';
  const userRank = ROLE_RANKS[userRole];

  const loadData = useCallback(async () => {
    const result = await CooperatingPartnerLogic.getAll('localStorage');
    if (result.success) {
      setPartners(result.data);
    }

    // Fetch and Merge Categories
    const savedCats = JSON.parse(localStorage.getItem('globalCategories') || "[]");
    const mergedCats = [...new Map([...mainCategories, ...savedCats].map(item => [item.id, item])).values()];
    setAllCategories(mergedCats);

    // Fetch and Merge Regions
    const savedRegs = JSON.parse(localStorage.getItem('globalRegions') || "[]");
    const mergedRegs = [...new Map([...defaultRegions, ...savedRegs].map(item => [item.id, item])).values()];
    setAllRegions(mergedRegs);
  }, [setPartners]);

  useEffect(() => {
    loadData();
    window.addEventListener("partnersUpdated", loadData);
    return () => window.removeEventListener("partnersUpdated", loadData);
  }, [loadData]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  // --- Filtering & Sorting Logic ---

  const filteredPartners = useMemo(() => {
    return partners.filter(p => {
        const categoryMatch = selectedCategory === "All" || String(p.category) === String(selectedCategory);
        const regionMatch = selectedRegion === "All" || p.regions?.some(rId => String(rId) === String(selectedRegion));
        return categoryMatch && regionMatch;
    });
}, [partners, selectedCategory, selectedRegion]);


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
      let aVal = a[sortConfig.key] || "";
      let bVal = b[sortConfig.key] || "";

      // Specific logic for sorting by Category Name instead of ID
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
      const result = await CooperatingPartnerLogic.remove(targetPartner.id, 'localStorage');
      if (result.success) {
        setPartners(prev => prev.filter(p => p.id !== targetPartner.id));
        setShowModal(false);
      }
    }
  };

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
            <th onClick={() => handleSort('company')} style={{ cursor: 'pointer' }}>
              Company {sortConfig.key === 'company' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
              Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Regions</th>
            <th onClick={() => handleSort('cost')} style={{ cursor: 'pointer' }}>
              Cost {sortConfig.key === 'cost' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('duration')} style={{ cursor: 'pointer' }}>
              Duration {sortConfig.key === 'duration' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Contact</th>
            {userRank >= ROLE_RANKS.MODERATOR && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((cp) => {
            // Find Category Name
            const categoryObj = allCategories.find(c => String(c.id) === String(cp.category));
            const categoryName = categoryObj ? categoryObj.name : "Uncategorized";

            // Find Region Names and clean up empty strings
            const regionNames = (cp.regions || [])
              .filter(id => id && String(id).trim() !== "")
              .map(id => allRegions.find(r => String(r.id) === String(id))?.name)
              .filter(Boolean)
              .join(", ");

            return (
              <tr key={cp.id}>
                <td>{cp.company}</td>
                <td>
                  <Badge bg="info" text="dark">
                    {allCategories.find(c => String(c.id).trim() === String(cp.category).trim())?.name || "Uncategorized"}
                  </Badge>
                </td>

                <td>
                  {cp.regions?.map(regionId => {
                    const found = allRegions.find(r => String(r.id).trim() === String(regionId).trim());
                    return found ? found.name : null;
                  }).filter(Boolean).join(", ") || "Global / N/A"}
                </td>
                <td>{cp.cost} EUR</td>
                <td>{cp.duration > 0 ? `${cp.duration} Wks` : "N/A"}</td>
                <td>{cp.contact}</td>

                {userRank >= ROLE_RANKS.MODERATOR && (
                  <td>
                    <Stack direction="horizontal" gap={2}>
                      <Link
                        to={ROUTES.changeCooperatingPartner.replace(':id', cp.id)}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        Edit
                      </Link>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => { setTargetPartner(cp); setShowModal(true); }}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      {/* Pagination Controls */}
{totalPages > 1 && (
  <Pagination className="justify-content-center mt-4">
    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />

    {(() => {
      const items = [];
      const leftSide = 1;
      const rightSide = totalPages;
      
      // Determine the range of pages to show around the current page
      // Show 1 neighbor on each side of the current page
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, currentPage + 1);

      // Always show the first page
      items.push(
        <Pagination.Item key={1} active={1 === currentPage} onClick={() => setCurrentPage(1)}>
          1
        </Pagination.Item>
      );

      // Add ellipsis if current range is far from the start
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }

      // Add pages in the middle range
      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          items.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
              {i}
            </Pagination.Item>
          );
        }
      }

      // Add ellipsis if current range is far from the end
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }

      // Always show the last page
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