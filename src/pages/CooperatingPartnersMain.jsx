import { Table, Badge, Button, Stack, Modal } from "react-bootstrap";
import CooperatingPartnerLogic from '../components/CooperatingPartners/CooperatingPartners';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { useEffect, useState } from "react";

const CooperatingPartnersMain = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [CooperatingPartners, setCooperatingPartners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [targetCooperatingPartner, setTargetCooperatingPartner] = useState(null);
  const categories = ["All", ...new Set(CooperatingPartners.map(s => s.category))];

  useEffect(() => {
    const loadData = async () => {
      const response = await CooperatingPartnerLogic.getCooperatingPartners();
      setCooperatingPartners(response.data);
    };
    loadData();
  }, []);

  const openConfirmModal = (id, title) => {
    setTargetCooperatingPartner({ id, title });
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (targetCooperatingPartner) {
      const result = await CooperatingPartnerLogic.remove(targetCooperatingPartner.id);
      if (result.success) {
        setCooperatingPartners(prev => prev.filter(s => s.id !== targetCooperatingPartner.id));
      }
    }
    setShowModal(false);
  };

  const filteredCooperatingPartners = selectedCategory && selectedCategory !== "All"
    ? CooperatingPartners.filter(CooperatingPartner => CooperatingPartner.category === selectedCategory)
    : CooperatingPartners;

  const sortedCooperatingPartners = [...filteredCooperatingPartners].sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  return (
    <div className="CooperatingPartners-container mt-4">
      <h2 className="mb-4 dynamic-heading">
        {selectedCategory ? `${selectedCategory} CooperatingPartners` : "All Available CooperatingPartners through our Cooperating Partners"}
      </h2>

      <Table striped bordered hover responsive className="shadow-sm custom-card">
        <thead className="table-dark">
          <tr>
            <th>CooperatingPartner Title</th>
            <th>Category</th>
            <th>Provider</th>
            <th>Investment</th>
            <th>Duration</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="dynamic-text">
          {sortedCooperatingPartners.length > 0 ? (
            sortedCooperatingPartners.map((CooperatingPartner) => (
              <tr key={CooperatingPartner.id}>
                <td className="fw-bold">{CooperatingPartner.title}</td>
                <td>
                  <Badge bg="info" text="dark">{CooperatingPartner.category}</Badge>
                </td>
                <td>{CooperatingPartner.company}</td>
                <td>{CooperatingPartner.cost} EUR</td>
                <td>{CooperatingPartner.duration} weeks</td>
                <td>{CooperatingPartner.contact}</td>
                <td style={{ minWidth: "200px" }}>
                  <Stack direction="horizontal" gap={2}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`${ROUTES.changeCooperatingPartner}/${CooperatingPartner.id}`)}
                    >
                      Change Data
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => openConfirmModal(CooperatingPartner.id, CooperatingPartner.title)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-muted">
                No CooperatingPartners found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Button
        variant="primary"
        onClick={() => navigate(ROUTES.newCooperatingPartner)}
        className="btn-primary"
      >
        Add New CooperatingPartner
      </Button>

      <div className="text-muted small mt-2">
        * Prices and durations are estimates based on standard project scopes...
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        contentClassName="custom-card dynamic-text" // Uses your existing theme classes
      >
        <Modal.Header closeButton className="bg-danger text-white border-0">
          <Modal.Title className="fw-bold">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4 text-center">
          <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '2rem' }}></i>
          <h5 className="mt-3 fw-bold">Are you sure?</h5>
          <p className="mb-0">
            You are about to remove <strong>{targetCooperatingPartner?.title}</strong>.
          </p>
          <small className="text-muted">This action cannot be undone.</small>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center pb-4">
          <Button variant="outline-secondary" className="px-4" onClick={() => setShowModal(false)}>
            Keep it
          </Button>
          <Button variant="danger" className="px-4 shadow-sm" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CooperatingPartnersMain;