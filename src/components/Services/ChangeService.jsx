import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants"; 
import { useEffect, useState } from "react";
import ServiceLogic from "../Services/Services"; 

export default function SmjerPromjena() {
    const navigate = useNavigate();
    const [service, setService] = useState({});

    async function loadService() {
        try {
            const response = await ServiceLogic.getById(id);
            setService(response.data);
        } catch (error) {
            console.error("Error loading service", error);
        }
    }

    useEffect(() => {
        loadService();
    }, [id]);

    async function handleUpdate(data) {
        try {
            await ServiceLogic.update(id, data);
            navigate(ROUTES.services); 
        } catch (error) {
            alert("Failed to update");
        }
    }

    function odradiSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);
        
        handleUpdate({
            title: podaci.get('title'),
            category: podaci.get('category'),
            company: podaci.get('company'),
            cost: parseFloat(podaci.get('cost')),
            duration: parseInt(podaci.get('duration')),
        });
    }

    return (
        <div className="container mt-5">
            <h3>Edit Service: {service.title}</h3>
            <Form onSubmit={odradiSubmit} className="shadow p-4 rounded bg-light">
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Service Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="title" 
                        required 
                        defaultValue={service.title} 
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="cost">
                            <Form.Label>Cost (EUR)</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="cost" 
                                step={0.01} 
                                defaultValue={service.cost} 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="duration">
                            <Form.Label>Duration (Weeks)</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="duration" 
                                defaultValue={service.duration} 
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="company">
                    <Form.Label>Provider / Company</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="company" 
                        defaultValue={service.company} 
                    />
                </Form.Group>

                <hr className="my-4" />

                <Row>
                    <Col>
                        <Link to={ROUTES.services} className="btn btn-secondary w-100">
                            Cancel
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success" className="w-100">
                            Save Changes
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}