import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { useState } from "react";

function OurProjectCardStyle01({ title, text, location, date, investment, image, link, onEdit, onDelete }) {
 const [isExpanded, setIsExpanded] = useState(false);
 const reservedHeight = '5.4rem';
 
 return (
    <Card className="shadow-sm project-card-fixed">
      {/* Action Overlay */}
      <div className="d-flex justify-content-end gap-2 p-2 position-absolute w-100" style={{ zIndex: 10 }}>
        <button className="btn btn-light btn-sm shadow-sm" onClick={onEdit} title="Edit">
          <i className="bi bi-pencil text-primary"></i>
        </button>
        <button className="btn btn-light btn-sm shadow-sm" onClick={onDelete} title="Delete">
          <i className="bi bi-trash text-danger"></i>
        </button>
      </div>

      <Card.Img 
        variant="top" 
        src={image || "https://placehold.co/600x400"} 
        className="project-card-img" 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate" title={title}>{title}</Card.Title>
        <div style={{ minHeight: isExpanded ? 'auto' : reservedHeight }} className="flex-grow-1">
  <Card.Text className="mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.2rem' }}>
    <span style={isExpanded ? {} : {
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    }}>
        {text || "No description provided."}
    </span>
  </Card.Text>

  {text && text.trim().length > 100 && (
    <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="btn btn-link p-0 fw-bold small text-decoration-none"
    >
        {isExpanded ? 'Show Less' : 'Read More'}
    </button>
  )}
</div>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><i className="bi bi-geo-alt me-2"></i>{location}</ListGroup.Item>
        <ListGroup.Item><i className="bi bi-calendar-event me-2"></i>{date}</ListGroup.Item>
        <ListGroup.Item><i className="bi bi-cash-stack me-2"></i>{investment} EUR</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link to={link} className="btn btn-primary w-100">View Project Gallery</Link>
      </Card.Body>
    </Card>
  );
}

export default OurProjectCardStyle01; 