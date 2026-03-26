import { Table, Badge, Button, Stack, Modal } from "react-bootstrap";
import ServiceLogic from '../components/Services/Services';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { useEffect, useState } from "react";

const ServicesMain = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [targetService, setTargetService] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await ServiceLogic.getServices();
      setServices(response.data);
    };
    loadData();
  }, []);

  const openConfirmModal = (id, title) => {
    setTargetService({ id, title });
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (targetService) {
      const result = await ServiceLogic.remove(targetService.id);
      if (result.success) {
        setServices(prev => prev.filter(s => s.id !== targetService.id));
      }
    }
    setShowModal(false);
  };

  const filteredServices = selectedCategory && selectedCategory !== "All"
    ? services.filter(service => service.category === selectedCategory)
    : services;

  const sortedServices = [...filteredServices].sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  return (
    <div className="services-container mt-4">
      <h2 className="mb-4 dynamic-heading">
        {selectedCategory ? `${selectedCategory} Services` : "All Available Services through our Cooperating Partners"}
      </h2>

      <Table striped bordered hover responsive className="shadow-sm custom-card">
        <thead className="table-dark">
          <tr>
            <th>Service Title</th>
            <th>Category</th>
            <th>Provider</th>
            <th>Investment</th>
            <th>Duration</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="dynamic-text">
          {sortedServices.length > 0 ? (
            sortedServices.map((service) => (
              <tr key={service.id}>
                <td className="fw-bold">{service.title}</td>
                <td>
                  <Badge bg="info" text="dark">{service.category}</Badge>
                </td>
                <td>{service.company}</td>
                <td>{service.cost} EUR</td>
                <td>{service.duration} weeks</td>
                <td>{service.contact}</td>
                <td style={{ minWidth: "200px" }}>
                  <Stack direction="horizontal" gap={2}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`${ROUTES.changeService}/${service.id}`)}
                    >
                      Change Data
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => openConfirmModal(service.id, service.title)}
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
                No services found for the selected category.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Button
        variant="primary"
        onClick={() => navigate(ROUTES.newService)}
        className="btn-primary"
      >
        Add New Service
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
            You are about to remove <strong>{targetService?.title}</strong>.
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

export default ServicesMain;