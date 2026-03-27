import { Card, Badge } from 'react-bootstrap';

export default function ForumMessage({ post }) {
  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0">{post.user}</h6>
          <small className="text-muted">{post.date}</small>
        </div>
        <Card.Text>{post.text}</Card.Text>

        {post.adminReply ? (
          <div className="ms-4 mt-3 p-3 bg-light rounded border-start border-primary border-4">
            <Badge bg="primary" className="mb-2">Admin Response</Badge>
            <p className="mb-0 italic small text-secondary">{post.adminReply}</p>
          </div>
        ) : (
          <Badge bg="secondary">Waiting for owner reply...</Badge>
        )}
      </Card.Body>
    </Card>
  );
}