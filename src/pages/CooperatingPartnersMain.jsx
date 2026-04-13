import { Table, Badge, Button, Stack, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { useEffect, useState, useCallback } from "react";
import CooperatingPartnerLogic from '../components/CooperatingPartners/CooperatingPartners';
import { useDataSource } from "../DataSource/DataSourceContext";
import { regions as allRegions } from "../DataSource/regionData";
import { mainCategories } from "../components/CooperatingPartners/CooperatingPartnersData/CooperatingPartnersMainCategoriesData";

const CooperatingPartnersMain = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [targetCooperatingPartner, setTargetCooperatingPartner] = useState(null);
  const { dataSource, partners, setPartners } = useDataSource();


  const loadData = useCallback(async (isUpdate = false) => {
    if (dataSource === 'memory' && partners.length > 0 && !isUpdate) {
      console.log("Memory mode: Using existing partners from Context.");
      return;
    }

    try {
      const response = await CooperatingPartnerLogic.getCooperatingPartners(dataSource);

      if (response) {
        const fetchedList = response.data?.data || response.data || (Array.isArray(response) ? response : []);

        if (dataSource !== 'memory') {
          setPartners(fetchedList);
        } else if (partners.length === 0) {
          setPartners(fetchedList);
        }
      }
    } catch (error) {
      console.error("Failed to load partners:", error);
    }
  }, [dataSource, setPartners, partners.length]);

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData(true);
    window.addEventListener("partnersUpdated", handleUpdate);
    return () => window.removeEventListener("partnersUpdated", handleUpdate);
  }, [loadData]);

  const openConfirmModal = (id, title) => {
    setTargetCooperatingPartner({ id, title });
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (targetCooperatingPartner) {
      const result = await CooperatingPartnerLogic.remove(targetCooperatingPartner.id, dataSource);
      if (result.success || result) {
        setPartners(prev => prev.filter(s => s.id !== targetCooperatingPartner.id));
      }
    }
    setShowModal(false);
  };

  const safePartners = Array.isArray(partners) ? partners : [];

  const filteredCooperatingPartners = (selectedCategory && selectedCategory !== "All")
    ? safePartners.filter(cp => {
      const catObj = mainCategories.find(cat => String(cat.id) === String(cp.category));
      const partnerCatName = catObj ? catObj.name : cp.category;
      return String(partnerCatName).toLowerCase() === String(selectedCategory).toLowerCase();
    })
    : safePartners;

  const sortedCooperatingPartners = [...filteredCooperatingPartners].sort((a, b) => {
    const catA = mainCategories.find(c => String(c.id) === String(a.category))?.name || "";
    const catB = mainCategories.find(c => String(c.id) === String(b.category))?.name || "";
    return catA.localeCompare(catB);
  });

  return (
    <div className="CooperatingPartners-container mt-4">
      <h2 className="mb-4 dynamic-heading">
        {selectedCategory && selectedCategory !== "All" ? `${selectedCategory} Partners` : "Cooperating Partners"}
      </h2>
      <Table striped bordered hover responsive className="shadow-sm custom-card">
        <thead className="table-dark">
          <tr>
            <th>Work title</th>
            <th>Category</th>
            <th>Provider</th>
            <th>Investment</th>
            <th>Duration</th>
            <th>Contact</th>
            <th>Region</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="dynamic-text">
          {sortedCooperatingPartners.length > 0 ? (
            sortedCooperatingPartners.map((cp) => {
              const catObj = mainCategories.find(cat => String(cat.id) === String(cp.category));
              const categoryName = catObj ? catObj.name : cp.category;

              const titleDisplay = Array.isArray(cp.titles) && cp.titles.length > 0
                ? cp.titles.filter(t => t.trim() !== "").join(", ")
                : (cp.title || cp.workTitle || "N/A");

              const regionDisplay = Array.isArray(cp.regions) && cp.regions.length > 0
                ? cp.regions
                  .map(regId => allRegions.find(r => String(r.id) === String(regId))?.name || regId)
                  .join(", ")
                : (allRegions.find(r => String(r.id) === String(cp.region))?.name || cp.region || "N/A");

              return (
                <tr key={cp.id}>
                  <td className="fw-bold">{titleDisplay}</td>
                  <td><Badge bg="info" text="dark">{categoryName}</Badge></td>
                  <td>{cp.company}</td>
                  <td>{cp.cost} EUR</td>
                  <td>{cp.duration} weeks</td>
                  <td>{cp.contact}</td>
                  <td>{regionDisplay}</td>
                  <td>
                    <Stack direction="horizontal" gap={2}>
                      <Link to={ROUTES.changeCooperatingPartner.replace(':id', cp.id)} className="btn btn-secondary btn-sm">
                        Edit
                      </Link>
                      <Button variant="outline-danger" size="sm" onClick={() => openConfirmModal(cp.id, titleDisplay)}>
                        Remove
                      </Button>
                    </Stack>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr><td colSpan="8" className="text-center py-4 text-muted">No Partners found.</td></tr>
          )}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => navigate(ROUTES.newCooperatingPartner)}>
        Add New Partner
      </Button>

      {/* Delete Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <h5>Are you sure?</h5>
          <p>Remove <strong>{targetCooperatingPartner?.title}</strong> from {dataSource}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CooperatingPartnersMain;