import { Table, Badge, Button } from "react-bootstrap";
import { servicesData } from './ServicesData';

const ServicesMain = ({ selectedCategory }) => {
  
  // Filter logic: Show specific category or everything if "All" is selected
  const filteredServices = selectedCategory && selectedCategory !== "All"
    ? servicesData.filter(service => service.category === selectedCategory)
    : servicesData;

  return (
    <div className="services-container mt-4">
      <h2 className="mb-4">
        {selectedCategory ? `${selectedCategory} Services` : "All Available Services"}
      </h2>
      
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Service Title</th>
            <th>Category</th>
            <th>Provider</th>
            <th>Investment</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
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
                <td>{service.cost}</td>
                <td>{service.duration}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-muted">
                No services found for the selected category.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      
      <div className="text-muted small mt-2">
        * Prices and durations are estimates based on standard project scopes.
      </div>
    </div>
  );
};

export default ServicesMain;