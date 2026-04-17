import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Pagination } from "react-bootstrap";
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
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

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
      const newProject = { 
        ...currentProject, 
        id: newId, 
        link: `/ourProjects/gallery/${newId}` 
      };
      saveAndPersist([...projects, newProject]);
    }
    setShowFormModal(false);
  };

  const confirmDelete = () => {
    saveAndPersist(projects.filter(p => p.id !== targetId));
    setShowDeleteModal(false);
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Our Projects</h2>
        <Button onClick={handleOpenAdd}>+ New Project</Button>
      </div>

      <Row className="g-4">
        {currentProjects.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={4}>
            <OurProjectCardStyle01
              {...item}
              link={item.link || `/ourProjects/gallery/${item.id}`} 
              onEdit={() => handleOpenEdit(item)}
              onDelete={() => { setTargetId(item.id); setShowDeleteModal(true); }}
            />
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-5">
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item 
              key={i + 1} 
              active={i + 1 === currentPage} 
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

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