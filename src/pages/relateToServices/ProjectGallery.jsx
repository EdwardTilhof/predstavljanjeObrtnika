import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Pagination, Spinner } from 'react-bootstrap';
import DeleteConfirmationModal from '../../crossPageComponents/modal/DeleteConfirmationModal';
import { PLACEHOLDER_IMAGE } from '../../Constants';
import AddEditModalProjectGallery from '../../components/OurProjects/AddEditModalProjectGallery';
import { ROLE_RANKS } from '../../Permissions/PermissonsConst';
import dataFacade from '../../services/dataFacade';


const ExpandableDescription = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const collapsedHeight = '3.6rem';
    if (!text) return <div style={{ minHeight: collapsedHeight }} className="text-muted small italic">No description</div>;

    return (
        <div style={{ minHeight: isExpanded ? 'auto' : collapsedHeight }}>
            <Card.Text className="text-muted mb-1" 
            style={{ fontSize: '0.75rem', lineHeight: '1.1rem' }}>
                <span
                    style={isExpanded ? {} : { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    dangerouslySetInnerHTML={{ __html: text || "No description" }}
                />
            </Card.Text>
            {text.length > 60 && (
                <Button variant="link" className="p-0 m-0 text-decoration-none extra-small-btn" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Show less' : 'Read more'}
                </Button>
            )}
        </div>
    );
};

const ProjectGallery = () => {
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const [projectTitle, setProjectTitle] = useState("");
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentImage, setCurrentImage] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [targetImageId, setTargetImageId] = useState(null);
    const [targetId, setTargetId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 8;
    const [loading, setLoading] = useState(true);

    const currentRole = localStorage.getItem('user_role') || 'GUEST';
    const userRank = ROLE_RANKS[currentRole] || 0;

    const loadData = async () => {
        const galleryData = await dataFacade.getGallery(id);
        setImages(galleryData);

        const allProjects = await dataFacade.getProjects();
        const foundProject = allProjects.find(p => String(p.id) === String(id));
        setProjectTitle(foundProject ? foundProject.title : "Project Gallery");
    };

    useEffect(() => {
        const initLoad = async () => {
            await loadData();
            setLoading(false);
        };
        initLoad();
    }, [id]);

    const handleSave = async () => {
        if (editMode) {
            await dataFacade.updateGalleryImage(id, currentImage.id, currentImage);
        } else {
            await dataFacade.addGalleryImage(id, currentImage);
        }
        await loadData();
        setShowFormModal(false);
    };

    const confirmDelete = async () => {
        await dataFacade.deleteGalleryImage(id, targetId);
        await loadData();
        setShowDeleteModal(false);
        setTargetId(null);
    };

    const totalPages = Math.ceil(images.length / imagesPerPage);
    const currentImages = images.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Project Gallery</h2>
                {userRank >= ROLE_RANKS.MODERATOR && (
                    <Button onClick={() => { setEditMode(false); setCurrentImage({}); setShowFormModal(true); }}>
                        Add Image
                    </Button>
                )}
            </div>

            <Row className="g-4">
                {currentImages.map((img) => (
                    <Col key={img.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="h-100 shadow-sm border-0 position-relative gallery-card">
                            {userRank >= ROLE_RANKS.MODERATOR && (
                                <div className="position-absolute top-0 end-0 p-2" style={{ zIndex: 10 }}>
                                    <Button size="sm" variant="light" className="me-1 shadow-sm" onClick={() => { setEditMode(true); setCurrentImage(img); setShowFormModal(true); }}>
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button
                                        variant="light"
                                        size="sm"
                                        className="shadow-sm"
                                        onClick={() => {
                                            setTargetId(img.id);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        <i className="bi bi-trash text-danger"></i>
                                    </Button>
                                </div>
                            )}
                            <Card.Img variant="top" src={img.url || PLACEHOLDER_IMAGE} style={{ height: '180px', objectFit: 'cover' }} />
                            <Card.Body className="p-3">
                                <Card.Title className="text-truncate h6 mb-2">{img.title}</Card.Title>
                                <ExpandableDescription text={img.description} />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-4">
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />

                    {(() => {
                        const items = [];
                        const leftSide = 1;
                        const rightSide = totalPages;

                        let startPage = Math.max(1, currentPage - 1);
                        let endPage = Math.min(totalPages, currentPage + 1);

                        items.push(
                            <Pagination.Item key={1} active={1 === currentPage} onClick={() => setCurrentPage(1)}>
                                1
                            </Pagination.Item>
                        );

                        if (startPage > 2) {
                            items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
                        }

                        for (let i = startPage; i <= endPage; i++) {
                            if (i !== 1 && i !== totalPages) {
                                items.push(
                                    <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
                                        {i}
                                    </Pagination.Item>
                                );
                            }
                        }

                        if (endPage < totalPages - 1) {
                            items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
                        }

                        if (totalPages > 1) {
                            items.push(
                                <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => setCurrentPage(totalPages)}>
                                    {totalPages}
                                </Pagination.Item>
                            );
                        }

                        return items;
                    })()}

                    <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            )}

            <AddEditModalProjectGallery show={showFormModal} onHide={() => setShowFormModal(false)} onSave={handleSave} data={currentImage} setData={setCurrentImage} editMode={editMode} title="Gallery Image" />
            <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onConfirm={confirmDelete} itemName="this image" />
        </Container>
    );
};

export default ProjectGallery;