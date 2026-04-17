import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import { createUniqueId } from '../../../dataRepository/UUIDGenerator';
import DeleteConfirmationModal from '../../crossPageComponents/modal/DeleteConfirmationModal';
import { PLACEHOLDER_IMAGE } from '../../Constants';

// mock data import
import { MOCK_GALLERY_DATA } from '../../../dataRepository/serviceData/ProjectGalleryData';
import AddEditModalProjectGallery from '../../components/services/OurProjects/AddEditModalProjectGallery';
import { PROJECT_CARD_DATA } from '../../../dataRepository/serviceData/ProjectCardData';


const ExpandableDescription = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const collapsedHeight = '3.6rem';

    if (!text) return <div style={{ minHeight: collapsedHeight }} className="text-muted small italic">No description</div>;

    return (
        <div style={{ minHeight: isExpanded ? 'auto' : collapsedHeight }}>
            <Card.Text className="text-muted mb-1" style={{ fontSize: '0.75rem', lineHeight: '1.1rem' }}>
                <span style={isExpanded ? {} : {
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {text}
                </span>
                {text.trim().length > 100 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="btn btn-link p-0 ms-1 fw-bold"
                        style={{ fontSize: '0.7rem', textDecoration: 'none' }}
                    >
                        {isExpanded ? 'Less' : 'More'}
                    </button>
                )}
            </Card.Text>
        </div>
    );
};

const ProjectGallery = () => {
    const { id } = useParams();
    const storageKey = `gallery_data_${id}`;

    // State
    const [images, setImages] = useState([]);
    const [projectTitle, setProjectTitle] = useState("Project Gallery");
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentImage, setCurrentImage] = useState({ url: '', title: '', description: '' });
    const [targetId, setTargetId] = useState(null);
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
        setImages(JSON.parse(saved));
    } else {
        const mockData = MOCK_GALLERY_DATA[id] || MOCK_GALLERY_DATA["default"] || [];
        setImages(mockData);
        
        if (mockData.length > 0) {
            localStorage.setItem(storageKey, JSON.stringify(mockData));
        }
    }

    const project = PROJECT_CARD_DATA.find(p => p.id === id);
    if (project) setProjectTitle(project.title);
}, [id, storageKey]);

    const saveAndPersist = (newList) => {
        setImages(newList);
        localStorage.setItem(storageKey, JSON.stringify(newList));
    };

    const handleOpenAdd = () => {
        setCurrentImage({ url: '', title: '', description: '' });
        setEditMode(false);
        setShowFormModal(true);
    };

    const handleOpenEdit = (img) => {
        setCurrentImage(img);
        setEditMode(true);
        setShowFormModal(true);
    };

    const handleSave = () => {
        if (editMode) {
            saveAndPersist(images.map(img => img.id === currentImage.id ? currentImage : img));
        } else {
            const newImage = { ...currentImage, id: createUniqueId('gallery-img') };
            saveAndPersist([...images, newImage]);
        }
        setShowFormModal(false);
    };

    const confirmDelete = () => {
        saveAndPersist(images.filter(img => img.id !== targetId));
        setShowDeleteModal(false);
    };

    // --- Pagination Logic ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = images.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(images.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0">{projectTitle}</h2>
                    <small className="text-muted">Project ID: {id}</small>
                </div>
                <Button variant="primary" onClick={handleOpenAdd}>+ Add Image</Button>
            </div>

            <Row>
                {currentItems.length > 0 ? (
                    currentItems.map((img) => (
                        <Col key={img.id} xs={12} sm={6} md={4} className="mb-4">
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Img
                                    variant="top"
                                    src={img.url || PLACEHOLDER_IMAGE}
                                    className="uniform-gallery-img"
                                />
                                <Card.Body className="d-flex flex-column p-3">
                                    <Card.Title className="h6 text-truncate">{img.title || "Untitled"}</Card.Title>
                                    <ExpandableDescription text={img.description} />
                                    
                                    <div className="d-flex justify-content-end gap-2 border-top pt-2 mt-auto">
                                        <Button variant="outline-secondary" size="sm" className="p-1" onClick={() => handleOpenEdit(img)}>
                                            <i className="bi bi-pencil" style={{ fontSize: '0.8rem' }}></i>
                                        </Button>
                                        <Button variant="outline-danger" size="sm" className="p-1" onClick={() => { setTargetId(img.id); setShowDeleteModal(true); }}>
                                            <i className="bi bi-trash" style={{ fontSize: '0.8rem' }}></i>
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col className="text-center py-5">
                        <p className="text-muted">No images in this gallery yet.</p>
                    </Col>
                )}
            </Row>

            {/* Pagination UI */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1} 
                        />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages} 
                        />
                    </Pagination>
                </div>
            )}

            {/* Modals */}
            <AddEditModalProjectGallery
                show={showFormModal}
                onHide={() => setShowFormModal(false)}
                onSave={handleSave}
                data={currentImage}
                setData={setCurrentImage}
                editMode={editMode}
                title="Gallery Image"
            />

            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                itemName={images.find(i => i.id === targetId)?.title || "this image"}
            />
        </Container>
    );
};

export default ProjectGallery;