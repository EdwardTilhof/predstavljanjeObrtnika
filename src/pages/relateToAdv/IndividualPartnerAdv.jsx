import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Row, Col, Badge, Button, Spinner } from 'react-bootstrap';
import CooperatingPartnerLogic from '../../components/partners/CooperatingPartnersLogic';
import { mainCategories } from '../../../dataRepository/partnersData/PartnersData';
import { regions } from '../../../dataRepository/locations/RegionsData';
import { ROUTES } from '../../constants';

const IndividualPartnerAdv = () => {
    const { id } = useParams();
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartner = async () => {
            const res = await CooperatingPartnerLogic.getAll('localStorage');
            if (res.success) {
                const found = res.data.find(p => String(p.id) === String(id));
                setPartner(found);
            }
            setLoading(false);
        };
        fetchPartner();
    }, [id]);

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    if (!partner) return <Container className="mt-5"><h3>Partner not found</h3></Container>;

    const categoryName = mainCategories.find(c => c.id === partner.category)?.name || "General";

    const regionNames = partner.regions
        .map(rId => regions.find(r => r.id === rId)?.name)
        .filter(Boolean)
        .join(", ");

    return (
        <Container className="mt-5 mb-5">
            <Link to={ROUTES.HOME} className="btn btn-primary mb-4">
                <i className="bi bi-arrow-left"></i> Back to Home
            </Link>

            <Card className="shadow-lg border-0 overflow-hidden">
                <Row className="g-0">
                    <Col md={5}>
                        <Card.Img 
                            src={partner.companyImage} 
                            alt={partner.company} 
                            style={{ height: '100%', objectFit: 'cover', minHeight: '300px' }} 
                        />
                    </Col>
                    <Col md={7}>
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h2 className="text-primary mb-1">{partner.titles[0]}</h2>
                                    <h4 className="text-muted">{partner.company}</h4>
                                </div>
                                <Badge bg="info" className="p-2">{categoryName}</Badge>
                            </div>

                            <hr />

                            <Row className="mb-4">
                                <Col sm={6}>
                                    <p className="mb-1 fw-bold text-uppercase small text-muted">Estimated Cost</p>
                                    <p className="fs-5 text-success">{partner.cost} EUR</p>
                                </Col>
                                <Col sm={6}>
                                    <p className="mb-1 fw-bold text-uppercase small text-muted">Typical Duration</p>
                                    <p className="fs-5">{partner.duration} Months</p>
                                </Col>
                            </Row>

                            <div className="mb-4">
                                <p className="mb-1 fw-bold text-uppercase small text-muted">Operating Regions</p>
                                <p>{regionNames || "Global"}</p>
                            </div>

                            <div className="mb-4">
                                <p className="mb-1 fw-bold text-uppercase small text-muted">Project Description</p>
                                <p className="text-secondary" style={{ lineHeight: '1.6' }}>
                                    {partner.description || "No description provided."}
                                </p>
                            </div>

                            <div className="bg-light p-3 rounded d-flex align-items-center justify-content-between">
                                <div>
                                    <p className="mb-0 fw-bold">Contact Representative</p>
                                    <p className="mb-0 text-primary">{partner.contact}</p>
                                </div>
                                <Button variant="primary"
                                href='https://github.com/EdwardTilhof'
                                target='_blank'
                                rel='noopener noreferrer'
                                >Link to {partner.company}</Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default IndividualPartnerAdv;