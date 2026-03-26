import { Table, Badge, Button, Stack, Row } from "react-bootstrap";
import ServiceLogic from '../components/Services/Services';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { useEffect, useState } from "react";

const ServicesMain = ({ selectedCategory }) => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await ServiceLogic.getServices();
      setServices(response.data);
    };
    loadData();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      const result = await ServiceLogic.remove(id);
      if (result.success) {
        // Update the local state to remove the item from the screen
        setServices(prev => prev.filter(service => service.id !== id));
      } else {
        alert("Error removing service.");
      }
    }
  };
 const filteredServices = selectedCategory && selectedCategory !== "All"
    ? services.filter(service => service.category === selectedCategory)
    : services;

  const sortedServices = [...filteredServices].sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  return (
    <div className="services-container mt-4">
      <h2 className="mb-4">
        {selectedCategory ? `${selectedCategory} Services` : "All Available Services trough our Cooperating Partners"}
      </h2>

      <Table striped bordered hover responsive className="shadow-sm">
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
        <tbody>
          {sortedServices.length > 0 ? (
            sortedServices.map((service) => (
              <tr key={service.id}>
                <td className="fw-bold">
                  {service.title}
                  <div className="text-muted small d-block d-md-none">
                    {service.description}
                  </div>
                </td>
                <td>
                  <Badge bg="info" text="dark">
                    {service.category}
                  </Badge>
                </td>
                <td>{service.company}</td>
                <td>{service.cost} EUR</td>
                <td>{service.duration} weeks</td>
                <td>{service.contact}</td>
                <td style={{minWidth: "200px"}}><Stack direction="horizontal" gap={2}><Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`${ROUTES.changeService}/${service.id}`)}
                >
                  Change Data </Button>
                    <Button
        variant="outline-danger"
        size="sm"
        onClick={() => handleDelete(service.id, service.title)}
      >
        Remove
      </Button>
      </Stack></td>
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

      <button
        variant="primary"
        onClick={() => navigate(ROUTES.newService)}
        className="btn btn-primary">Add New Service
      </button>

      <div className="text-muted small mt-2">
        * Prices and durations are estimates based on standard project scopes. It may change based on specific requirements and negotiations with providers. Please contact the service provider directly for a detailed quote and project timeline.
      </div>
    </div>
  );
};

export default ServicesMain;