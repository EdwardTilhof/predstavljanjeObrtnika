import { Table, Badge, Button, Stack, Modal, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { useEffect, useState } from "react";
import CooperatingPartnerLogic from '../components/CooperatingPartners/CooperatingPartners';
import { useDataSource } from "../DataSource/DataSourceContext";

const CooperatingPartnersMain = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [targetCooperatingPartner, setTargetCooperatingPartner] = useState(null);
  const { dataSource, setDataSource } = useDataSource();

  const [CooperatingPartners, setCooperatingPartners] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await CooperatingPartnerLogic.getCooperatingPartners(dataSource);
      setCooperatingPartners(response.data || []);
    };
    loadData();
    window.addEventListener("partnersUpdated", loadData);
    return () => window.removeEventListener("partnersUpdated", loadData);
  }, [dataSource]);

  const openConfirmModal = (id, title) => {
    setTargetCooperatingPartner({ id, title });
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (targetCooperatingPartner) {
      const result = await CooperatingPartnerLogic.remove(targetCooperatingPartner.id, dataSource);
      if (result.success) {
        setCooperatingPartners(prev => prev.filter(s => s.id !== targetCooperatingPartner.id));
      }
    }
    setShowModal(false);
  };

  const filteredCooperatingPartners = selectedCategory && selectedCategory !== "All"
    ? CooperatingPartners.filter(cp => cp.category === selectedCategory)
    : CooperatingPartners;

  const sortedCooperatingPartners = [...filteredCooperatingPartners].sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  return (
    <div className="CooperatingPartners-container mt-4">
      <h2 className="mb-4 dynamic-heading">
        {selectedCategory ? `${selectedCategory} Partners` : "Cooperating Partners"}
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="dynamic-text">
          {sortedCooperatingPartners.length > 0 ? (
            sortedCooperatingPartners.map((cp) => (
              <tr key={cp.id}>
                <td className="fw-bold">{cp.title}</td>
                <td><Badge bg="info" text="dark">{cp.category}</Badge></td>
                <td>{cp.company}</td>
                <td>{cp.cost} EUR</td>
                <td>{cp.duration} weeks</td>
                <td>{cp.contact}</td>
                <td>
                  <Stack direction="horizontal" gap={2}>
                    <Link to={ROUTES.changeCooperatingPartner.replace(':id', cp.id)} className="btn btn-secondary btn-sm">
                      Edit
                    </Link>
                    <Button variant="outline-danger" size="sm" onClick={() => openConfirmModal(cp.id, cp.title)}>
                      Remove
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7" className="text-center py-4 text-muted">No Partners found.</td></tr>
          )}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => navigate(ROUTES.newCooperatingPartner)}>
        Add New Partner
      </Button>

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