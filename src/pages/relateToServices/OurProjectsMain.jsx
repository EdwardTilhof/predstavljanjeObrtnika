import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from "react-bootstrap";
import OurProjectCardStyle01 from "../../components/services/OurProjects/OurProjectCard";
import { PROJECT_CARD_DATA } from "../../../dataRepository/serviceData/ProjectCardData";
import { createUniqueId } from "../../../dataRepository/UUIDGenerator";
import AddEditModalProjectsMain from '../../components/services/OurProjects/AddEditModalProjectsMain';

export default function OurProjectsMain() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    title: '', text: '', location: '', date: '', investment: '', image: ''
  });

  const storageKey = 'main_projects_data';

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setProjects(saved ? JSON.parse(saved) : PROJECT_CARD_DATA);
  }, []);

  const handleSave = () => {
    const newProject = { 
      ...currentProject, 
      id: createUniqueId('ourprojectscard'),
      link: `/ourProjects/gallery/` 
    };
    const updatedList = [...projects, newProject];
    setProjects(updatedList);
    localStorage.setItem(storageKey, JSON.stringify(updatedList));
    setShowModal(false);
    setCurrentProject({ title: '', text: '', location: '', date: '', investment: '', image: '' });
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Our Projects:</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>+ New Project</Button>
      </div>

      <Row className="Row-Card01">
        {projects.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={4} className="d-flex justify-content-center mb-4">
            <OurProjectCardStyle01
              title={item.title}
              text={item.text}
              location={item.location}
              date={item.date}
              investment={item.investment}
              image={item.image}
              link={`/ourProjects/gallery/${item.id}`}
            />
          </Col>
        ))}
      </Row>

      <AddEditModalProjectsMain
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        data={currentProject}
        setData={setCurrentProject}
        editMode={false}
        title="Project Card"
      />
    </Container>
  );
}