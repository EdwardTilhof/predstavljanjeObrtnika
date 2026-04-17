import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { PLACEHOLDER_IMAGE } from "../../../Constants";
import { useState } from "react";

function ProjectCardStyle01({ title, text, location, date, investment, image, link }) {
 const [isExpanded, setIsExpanded] = useState(false);
 
 const reservedHeight = '3.6rem';
 
 return (
    <Card className="shadow-sm project-card-fixed">
      <Card.Img 
        variant="top" 
        src={image || "https://placehold.co/600x400"} 
        className="project-card-img" 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate" title={title}>{title}</Card.Title>
        
        {/* Main Text Container */}
        <div style={{ minHeight: isExpanded ? 'auto' : reservedHeight }} className="flex-grow-1">
          <Card.Text className="mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.5rem' }}>
            <span style={isExpanded ? {} : {
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {text || "No description provided."}
            </span>
          </Card.Text>
          
          {text && text.length > 100 && (
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn btn-link p-0 fw-bold"
                style={{ fontSize: '0.8rem', textDecoration: 'none' }}
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
        <Link to={link} className="btn btn-primary w-100">
          View Project Gallery
        </Link>
      </Card.Body>
    </Card>
  );
}

export default OurProjectCardStyle01;