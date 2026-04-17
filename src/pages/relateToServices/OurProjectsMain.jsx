import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from "react-bootstrap";
import OurProjectCardStyle01 from "../../components/services/OurProjects/OurProjectCard";
import { PROJECT_CARD_DATA } from "../../../dataRepository/serviceData/ProjectCardData";
import { createUniqueId } from "../../../dataRepository/UUIDGenerator";
import AddEditModalProjectsMain from '../../components/services/OurProjects/AddEditModalProjectsMain';
import DeleteConfirmationModal from '../../crossPageComponents/modal/DeleteConfirmationModal';

export default function OurProjectsMain() {
  const [projects, setProjects] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState({ title: '', text: '', location: '', date: '', investment: '', image: '' });
  const [targetId, setTargetId] = useState(null);

  const storageKey = 'main_projects_data';

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setProjects(saved ? JSON.parse(saved) : PROJECT_CARD_DATA); //
  }, []);

  const saveAndPersist = (newList) => {
    setProjects(newList);
    localStorage.setItem(storageKey, JSON.stringify(newList));
  };

  const handleOpenAdd = () => {
    setCurrentProject({ title: '', text: '', location: '', date: '', investment: '', image: '' });
    setEditMode(false);
    setShowFormModal(true);
  };

  const handleOpenEdit = (project) => {
    setCurrentProject(project);
    setEditMode(true);
    setShowFormModal(true);
  };

  const handleSave = () => {
    if (editMode) {
      saveAndPersist(projects.map(p => p.id === currentProject.id ? currentProject : p));
    } else {
      const newId = createUniqueId('ourprojectscard');
      const newProject = { ...currentProject, id: newId, link: `/ourProjects/gallery/${newId}` };
      saveAndPersist([...projects, newProject]);
    }
    setShowFormModal(false);
  };

  const confirmDelete = () => {
    saveAndPersist(projects.filter(p => p.id !== targetId));
    setShowDeleteModal(false);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Our Projects</h2>
        <Button variant="primary" onClick={handleOpenAdd}>+ Add New Project</Button>
      </div>

      <Row className="Row-Card01">
        {projects.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={4} className="mb-4">
            <OurProjectCardStyle01
              {...item}
              onEdit={() => handleOpenEdit(item)}
              onDelete={() => { setTargetId(item.id); setShowDeleteModal(true); }}
            />
          </Col>
        ))}
      </Row>

      <AddEditModalProjectsMain
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        onSave={handleSave}
        data={currentProject}
        setData={setCurrentProject}
        editMode={editMode}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        itemName={projects.find(p => p.id === targetId)?.title}
      />
    </Container>
  );
}