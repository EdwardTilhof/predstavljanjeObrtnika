import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import { createUniqueId } from '../../../dataRepository/UUIDGenerator';
import DeleteConfirmationModal from '../../crossPageComponents/modal/DeleteConfirmationModal';
import { PLACEHOLDER_IMAGE } from '../../Constants';
import { MOCK_GALLERY_DATA } from '../../../dataRepository/projectData/ProjectGalleryData';
import AddEditModalProjectGallery from '../../components/projects/OurProjects/AddEditModalProjectGallery';
import { PROJECT_CARD_DATA } from '../../../dataRepository/projectData/ProjectCardData';
import { useUser } from "@clerk/clerk-react";

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
            </Card.Text>
            {text.length > 80 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="btn btn-link p-0 fw-bold"
                    style={{ fontSize: '0.7rem', textDecoration: 'none' }}
                >
                    {isExpanded ? 'Less' : 'More'}
                </button>
            )}
        </div>
    );
};

const ProjectGallery = () => {

    const { id } = useParams();
    const { isLoaded, user } = useUser();
    const isDevAdmin = localStorage.getItem("dev_admin") === "true";
    const isEditor = isDevAdmin || (isLoaded && (user?.publicMetadata?.role === 'admin' || user?.publicMetadata?.role === 'editor'));

    const [projectTitle, setProjectTitle] = useState('Project Gallery');
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentImage, setCurrentImage] = useState({ url: '', title: '', description: '' });
    const [targetId, setTargetId] = useState(null);

    const imagesPerPage = 8;
    const storageKey = `gallery_images_${id}`;

    useEffect(() => {
        // 1. Load Images
        const rawSavedGallery = localStorage.getItem(storageKey);
        let galleryData = null;
        try {
            galleryData = (rawSavedGallery && typeof rawSavedGallery === 'string') ? JSON.parse(rawSavedGallery) : null;
        } catch (e) { console.error("Error parsing gallery", e); }

        if (galleryData && Array.isArray(galleryData)) {
            setImages(galleryData);
        } else {
            const mockData = MOCK_GALLERY_DATA[id] || MOCK_GALLERY_DATA["default"] || [];
            setImages(mockData);
            if (mockData.length > 0) localStorage.setItem(storageKey, JSON.stringify(mockData));
        }

        // 2. Load Project Title
        const projectStorageKey = 'main_projects_data';
        const rawSavedProjects = localStorage.getItem(projectStorageKey);
        let allProjects = PROJECT_CARD_DATA;

        if (rawSavedProjects) {
            try {
                const parsed = JSON.parse(rawSavedProjects);
                if (Array.isArray(parsed)) allProjects = parsed;
            } catch (e) { console.error("Error parsing projects", e); }
        }

        // Use strict string comparison for IDs
        const foundProject = allProjects.find(p => String(p.id) === String(id));
        setProjectTitle(foundProject ? foundProject.title : "Project Gallery");

    }, [id, storageKey]);

    const saveAndPersist = (newList) => {
        setImages(newList);
        localStorage.setItem(storageKey, JSON.stringify(newList));
    };

    const handleSave = () => {
        if (editMode) {
            saveAndPersist(images.map(img => img.id === currentImage.id ? currentImage : img));
        } else {
            const newImg = { ...currentImage, id: createUniqueId('galleryitem') };
            saveAndPersist([newImg, ...images]);
        }
        setShowFormModal(false);
    };

    const confirmDelete = () => {
        saveAndPersist(images.filter(img => img.id !== targetId));
        setShowDeleteModal(false);
    };

    const totalPages = Math.ceil(images.length / imagesPerPage);
    const currentImages = images.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Project Gallery</h2>
                {/* 2. Now isEditor is defined, so this won't crash */}
                {isEditor && (
                    <Button onClick={() => { setEditMode(false); setCurrentImage({}); setShowFormModal(true); }}>
                        + Add Image
                    </Button>
                )}
            </div>

            <Row className="g-4">
                {currentImages.map((img) => (
                    <Col key={img.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="h-100 shadow-sm border-0 position-relative">
                            {isEditor && (
                                <div className="position-absolute top-0 end-0 p-2 d-flex gap-1" style={{ zIndex: 10 }}>
                                    <Button size="sm" variant="light" className="shadow-sm p-1" onClick={() => { setEditMode(true); setCurrentImage(img); setShowFormModal(true); }}>
                                        <i className="bi bi-pencil text-primary"></i>
                                    </Button>
                                    <Button size="sm" variant="light" className="shadow-sm p-1" onClick={() => { setTargetId(img.id); setShowDeleteModal(true); }}>
                                        <i className="bi bi-trash text-danger"></i>
                                    </Button>
                                </div>
                            )}
                            <Card.Img variant="top" src={img.url || PLACEHOLDER_IMAGE} style={{ height: '180px', objectFit: 'cover' }} />
                            <Card.Body className="p-3">
                                <Card.Title className="text-truncate h6 mb-2" title={img.title}>{img.title}</Card.Title>
                                <ExpandableDescription text={img.description} />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-5">
                    {[...Array(totalPages)].map((_, i) => (
                        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            )}

            <AddEditModalProjectGallery show={showFormModal} onHide={() => setShowFormModal(false)} onSave={handleSave} data={currentImage} setData={setCurrentImage} editMode={editMode} title="Gallery Image" />
            <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onConfirm={confirmDelete} itemName="this image" />
        </Container>
    );
};

export default ProjectGallery;