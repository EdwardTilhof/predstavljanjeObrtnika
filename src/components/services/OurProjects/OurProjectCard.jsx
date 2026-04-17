import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { PLACEHOLDER_IMAGE } from "../../../Constants";

function ProjectCardStyle01({ title, text, location, date, investment, image, link }) {
  return (
    <Card className="shadow-sm project-card-fixed">
      <Card.Img 
        variant="top" 
        src={image || PLACEHOLDER_IMAGE} 
        className="project-card-img" 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text className="flex-grow-1">{text}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><i className="bi bi-geo-alt me-2"></i>{location}</ListGroup.Item>
        <ListGroup.Item><i className="bi bi-calendar-event me-2"></i>{date}</ListGroup.Item>
        <ListGroup.Item><i className="bi bi-cash-stack me-2"></i>{investment} EUR</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link to={link} className="btn btn-primary w-100">
          View Project Gallery
        </Link>
      </Card.Body>
    </Card>
  );
}

export default ProjectCardStyle01;