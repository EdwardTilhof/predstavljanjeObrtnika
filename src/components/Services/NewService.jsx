import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { servicesData } from "./ServicesData";

export function NewService() {

    const navigate = useNavigate();

   const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newService = {
            id: Math.floor(Math.random() * 10000), // Generate a random ID for demonstration
            title: formData.get("title"),
            category: formData.get("category"),
            company: formData.get("company"),
            cost: formData.get("cost"),
            duration: formData.get("duration"),
            contact: formData.get("contact"),
            actions: formData.getAll("actions"),
            description: formData.get("description")
        };
        servicesData.push(newService);
        navigate(ROUTES.services);
    }

    return (
        <div className="new-service-form">
            <h2 className="mb-4">Add New Service</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name="category" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" name="company" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Cost</Form.Label>
                    <Form.Control type="text" name="cost" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" name="duration" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control type="email" name="contact" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Actions</Form.Label>
                    < Form.Control as="textarea" rows={3} name="actions" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    < Form.Control as="textarea" rows={3} name="description" required />
                </Form.Group>

                <hr style={{ marginTop: '50px', border: '0px' }} />


                <div className="mt-4">
                    <Button type="submit" variant="primary" className="me-2">
                        Add Service
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(ROUTES.services)}>
                        Cancel
                    </Button>
                </div>            
                </Form>
        </div>
    );
}