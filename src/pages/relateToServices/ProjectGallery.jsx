import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
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
            </Card.Text>
            {text.length > 30 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="btn btn-link p-0"
                    style={{ fontSize: '0.7rem', textDecoration: 'none', fontWeight: 'bold', display: 'block' }}
                >
                    {isExpanded ? 'Show Less' : 'Read More'}
                </button>
            )}
        </div>
    );
};

const ProjectGallery = () => {
    const { projectId } = useParams();
    const [images, setImages] = useState([]);
    const project = PROJECT_CARD_DATA.find(p => p.id === projectId);
    // Modal States
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // Data States
    const [currentImage, setCurrentImage] = useState({ id: '', url: '', title: '', description: '' });
    const [targetId, setTargetId] = useState(null);

    const storageKey = `gallery_data_${projectId}`;

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setImages(JSON.parse(saved));
        } else {
            // Use mock data if storage is empty
            setImages(MOCK_GALLERY_DATA);
        }
    }, [projectId, storageKey]);

    const saveAndPersist = (newList) => {
        setImages(newList);
        localStorage.setItem(storageKey, JSON.stringify(newList));
    };

    const handleOpenAdd = () => {
        setCurrentImage({ id: '', url: '', title: '', description: '' });
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
            const newImg = { ...currentImage, id: createUniqueId('ourprojectscard') };
            saveAndPersist([...images, newImg]);
        }
        setShowFormModal(false);
    };

    const confirmDelete = () => {
        saveAndPersist(images.filter(img => img.id !== targetId));
        setShowDeleteModal(false);
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Project Gallery: {project ? project.title : 'Gallery'}</h2>
                <Button variant="primary" onClick={handleOpenAdd}>+ Add Image</Button>
            </div>

            <Row>
                {images.map((img) => (
                    <Col key={img.id} xs="auto" className="mb-4 d-flex align-items-stretch">
                        <Card className="shadow-sm border">
                            <Card.Img
                                variant="top"
                                src={img.url || PLACEHOLDER_IMAGE}
                                className="project-card-img"
                            />
                            <Card.Body className="p-2 d-flex flex-column">
                                <Card.Title className="small fw-bold mb-1 text-truncate" style={{ height: '1rem' }}>
                                    {img.title || "Untitled"}
                                </Card.Title>

                                <ExpandableDescription text={img.description} />

                                <div className="d-flex gap-1 justify-content-center border-top pt-2 mt-auto">
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
                ))}
            </Row>

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
                itemName={images.find(i => i.id === targetId)?.title}
            />
        </Container>
    );
};

export default ProjectGallery;