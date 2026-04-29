import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Pagination, Spinner } from "react-bootstrap";
import OurProjectCardStyle01 from "../../components/OurProjects/OurProjectCard";
import AddEditModalProjectsMain from '../../components/OurProjects/AddEditModalProjectsMain';
import DeleteConfirmationModal from '../../crossPageComponents/modal/DeleteConfirmationModal';
import { ROLE_RANKS } from '../../Permissions/PermissonsConst';
import SearchBox from "../../crossPageComponents/search/SearchBox";
import dataFacade from '../../services/dataFacade';

export default function OurProjectsMain() {
  const [projects, setProjects] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState({ title: '', text: '', location: '', date: '', investment: '', image: '' });
  const [targetId, setTargetId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const currentRole = localStorage.getItem('user_role') || 'GUEST';
  const userRank = ROLE_RANKS[currentRole] || 0;
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    const data = await dataFacade.getProjects();
    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    setProjects(sortedData);
  };

  useEffect(() => {
    const initLoad = async () => {
      await loadProjects();
      setLoading(false);
    };
    initLoad();
  }, []);

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

  const handleSave = async () => {
    if (editMode) {
      await dataFacade.updateProject(currentProject.id, currentProject);
    } else {
      await dataFacade.addProject(currentProject);
    }
    await loadProjects();
    setShowFormModal(false);
  };

  const confirmDelete = async () => {
    await dataFacade.deleteProject(targetId);
    await loadProjects();
    setShowDeleteModal(false);
  };

  const filteredProjects = projects.filter((project) =>
    (project.title || '').toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); 
  };

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
        <h2 className="dynamic-text">Our Projects</h2>
        {userRank >= ROLE_RANKS.MODERATOR && (
          <Button onClick={handleOpenAdd} variant="primary">+ New Project</Button>
        )}
      </div>

      <SearchBox value={searchTerm} onChange={handleSearchChange} />

      <Row className="g-4">
        {currentProjects.length > 0 ? (
          currentProjects.map((item) => (
            <Col key={item.id} xs={12} md={6} lg={4}>
              <OurProjectCardStyle01
                {...item}
                link={item.link || `/ourProjects/gallery/${item.id}`}
                onEdit={() => handleOpenEdit(item)}
                onDelete={() => { setTargetId(item.id); setShowDeleteModal(true); }}
              />
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center py-5">
            <p className="text-muted">No projects found matching "{searchTerm}"</p>
          </Col>
        )}
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

            // Always show the first page
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