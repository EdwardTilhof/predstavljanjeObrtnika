import { Table, Badge, Button } from "react-bootstrap";
import { servicesData } from '../components/Services/ServicesData';

const ServicesMain = ({ selectedCategory }) => {
  
  const filteredServices = selectedCategory && selectedCategory !== "All"
    ? servicesData.filter(service => service.category === selectedCategory)
    : servicesData;

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
            <th>Actions</th>
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
                <td>{service.cost}</td>
                <td>{service.duration}</td>
                <td>{service.contact}</td>
                <td>{service.actions.map((action, index)=> (
                  <span key ={index}>
                    {action}
                    {/* Add a separator if it's not the last action */}
                    {index < service.actions.length - 1 && ", "}
                  </span>
                ))}</td>
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
      
      <div className="text-muted small mt-2">
        * Prices and durations are estimates based on standard project scopes. It may change based on specific requirements and negotiations with providers. Please contact the service provider directly for a detailed quote and project timeline.
      </div>
    </div>
  );
};

export default ServicesMain;