import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../colorsAndDesign/SiteColors';
import '../../colorsAndDesign/ColorsStyle.css';
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_PHONE,
    COMPANY_EMAIL,
    COMPANY_WORKING_HOURS,
    COMPANY_CID
} from '../../Constants';

const ContactUs = () => {
    return (
        <div className="MainContainer py-5">
            <Container>

                {/* Header Section */}
                <div className="text-center mb-5">
                    <h1 className="dynamic-heading display-4 fw-bold">Get in Touch</h1>
                    <p className="dynamic-text fs-5">
                        Have a project in mind or want to learn more about our services? We would love to hear from you.
                    </p>
                </div>

                <Row className="g-4">

                    {/* Contact Form Column */}
                    <Col lg={7}>
                        <div className="p-5 shadow-sm border custom-card h-100">
                            <h3 className="dynamic-heading mb-4 fw-bold">Send us a Message</h3>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formName">
                                            <Form.Label className="dynamic-text fw-medium">Name</Form.Label>
                                            <Form.Control type="text" placeholder="Your Name" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label className="dynamic-text fw-medium">Email</Form.Label>
                                            <Form.Control type="email" placeholder="Your Email" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3" controlId="formSubject">
                                    <Form.Label className="dynamic-text fw-medium">Subject</Form.Label>
                                    <Form.Control type="text" placeholder="Subject" />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formMessage">
                                    <Form.Label className="dynamic-text fw-medium">Message</Form.Label>
                                    <Form.Control as="textarea" rows={5} placeholder="Write your message here..." />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="px-5 py-2 fw-bold shadow-sm" style={{ borderRadius: '25px' }}>
                                    Send Message
                                </Button>
                            </Form>
                        </div>
                    </Col>

                    {/* Contact Information Column */}
                    <Col lg={5}>
                        <div className="p-5 shadow-sm border custom-card h-100">
                            <h3 className="dynamic-heading mb-4 fw-bold">{COMPANY_NAME}</h3>

                            <div className="mb-4">
                                <h5 className="dynamic-heading fw-bold mb-1">📍 Location</h5>
                                <p className="fs-6 mb-0" style={{ color: 'var(--feature-text-muted)' }}>
                                    {COMPANY_ADDRESS}
                                </p>
                            </div>

                            <div className="mb-4">
                                <h5 className="dynamic-heading fw-bold mb-1">📞 Phone</h5>
                                <p className="fs-6 mb-0" style={{ color: 'var(--feature-text-muted)' }}>
                                    {COMPANY_PHONE}
                                </p>
                            </div>

                            <div className="mb-4">
                                <h5 className="dynamic-heading fw-bold mb-1">✉️ Email</h5>
                                <p className="fs-6 mb-0" style={{ color: 'var(--feature-text-muted)' }}>
                                    {COMPANY_EMAIL}
                                </p>
                            </div>

                            <div className="mb-4">
                                <h5 className="dynamic-heading fw-bold mb-1">🕒 Business Hours</h5>
                                <p className="fs-6 mb-0" style={{ color: 'var(--feature-text-muted)' }}>
                                    {COMPANY_WORKING_HOURS}<br />
                                    Saturday - Sunday: Closed
                                </p>
                            </div>

                            <div className="mb-0">
                                <h5 className="dynamic-heading fw-bold mb-1">🏢 Company ID</h5>
                                <p className="fs-6 mb-0" style={{ color: 'var(--feature-text-muted)' }}>
                                    CID: {COMPANY_CID}
                                </p>
                            </div>

                        </div>
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default ContactUs;