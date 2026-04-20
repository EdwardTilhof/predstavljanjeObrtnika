import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Pagination } from "react-bootstrap";
import OurProjectCardStyle01 from "../../components/projects/OurProjects/OurProjectCard";
import { PROJECT_CARD_DATA } from "../../../dataRepository/projectData/ProjectCardData";
import AddEditModalProjectsMain from '../../components/projects/OurProjects/AddEditModalProjectsMain';
import DeleteConfirmationModal from '../../crossPageComponents/modal/DeleteConfirmationModal';
import { useUser } from "@clerk/clerk-react";

export default function OurProjectsMain() {
const { user, isLoaded } = useUser(); 
const isDevAdmin = localStorage.getItem("dev_admin") === "true";
const isEditor = isDevAdmin || (isLoaded && (user?.publicMetadata?.role === 'admin' || user?.publicMetadata?.role === 'editor'));

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
    let data = [];

    if (saved) {
      data = JSON.parse(saved);
    } else {
      // If no data exists, use mock data and save it immediately to lock the IDs
      data = PROJECT_CARD_DATA;
      localStorage.setItem(storageKey, JSON.stringify(data));
    }

    // Sort by date: Newest first
    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    setProjects(sortedData);
  }, []);

  const saveAndPersist = (newList) => {
    // Keep list sorted when adding/editing
    const sorted = [...newList].sort((a, b) => new Date(b.date) - new Date(a.date));
    setProjects(sorted);
    localStorage.setItem(storageKey, JSON.stringify(sorted));
  };

  const handleOpenAdd = () => {
    setEditMode(false);
    setCurrentProject({ title: '', text: '', location: '', date: '', investment: '', image: '' });
    setShowFormModal(true);
  };

  const handleOpenEdit = (project) => {
    setEditMode(true);
    setCurrentProject({ ...project });
    setShowFormModal(true);
  };

  const handleSave = () => {
    if (editMode) {
      saveAndPersist(projects.map(p => p.id === currentProject.id ? currentProject : p));
    } else {
      const newProject = { ...currentProject, id: Date.now().toString() };
      saveAndPersist([newProject, ...projects]);
    }
    setShowFormModal(false);
  };

  const confirmDelete = () => {
    saveAndPersist(projects.filter(p => p.id !== targetId));
    setShowDeleteModal(false);
  };

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="dynamic-text">Our Projects</h2>
        {isEditor && (
          <Button onClick={handleOpenAdd} variant="primary">+ New Project</Button>
        )}
      </div>

      <Row className="g-4">
        {currentProjects.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={4}>
            <OurProjectCardStyle01
              {...item}
              link={item.link || `/ourProjects/gallery/${item.id}`}
              onEdit={isEditor ? () => handleOpenEdit(item) : null}
              onDelete={isEditor ? () => { setTargetId(item.id); setShowDeleteModal(true); } : null}
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
        itemName={projects.find(p => p.id === targetId)?.title || "this project"}
      />
    </Container>
  );
}