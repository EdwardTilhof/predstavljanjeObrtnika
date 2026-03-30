import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { CooperatingPartnersData } from "./CooperatingPartnersData";

export function NewCooperatingPartner() {

    const navigate = useNavigate();

   const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const rawCost = formData.get("cost").replace(/[^0-9.]/g, "");
    const rawDuration = formData.get("duration").replace(/[^0-9]/g, "");

    const costValue = parseFloat(rawCost);
    const durationValue = parseInt(rawDuration, 10);

    if (isNaN(costValue) || isNaN(durationValue)) {
        alert("Please enter valid numbers for Cost and Duration.");
        return;
    }

    const newCooperatingPartner = {
            id: Math.floor(Math.random() * 10000), // Generate a random ID for demonstration
            title: formData.get("title"),
            category: formData.get("category"),
            company: formData.get("company"),
            cost: costValue,
            duration: durationValue,
            contact: formData.get("contact"),
            description: formData.get("description")
        };
        CooperatingPartnersData.push(newCooperatingPartner);
        navigate(ROUTES.CooperatingPartners);
    }

    return (
        <div className="new-CooperatingPartner-form">
            <h2 className="mb-4">Add New CooperatingPartner</h2>
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
                    <Form.Label>Description</Form.Label>
                    < Form.Control as="textarea" rows={3} name="description" required />
                </Form.Group>

                <hr style={{ marginTop: '50px', border: '0px' }} />


                <div className="mt-4">
                    <Button type="submit" variant="primary" className="me-2">
                        Add CooperatingPartner
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(ROUTES.CooperatingPartners)}>
                        Cancel
                    </Button>
                </div>            
                </Form>
        </div>
    );
}