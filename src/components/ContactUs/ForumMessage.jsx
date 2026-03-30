import { Card, Badge } from 'react-bootstrap';

export default function ForumMessage({ post }) {
  return (
    <Card className="mb-4 shadow-sm custom-card"> 
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0 dynamic-text">{post.user}</h6>
          <small className="text-muted">{post.date}</small>
        </div>
        <Card.Text className="dynamic-text">{post.text}</Card.Text>

        {post.adminReply ? (
          <div 
            className="ms-4 mt-3 p-3 rounded border-start border-4"
            style={{ 
              backgroundColor: 'var(--input-bg)', 
              borderLeftColor: 'var(--heading-color)' 
            }}
          >
            <Badge className="mb-2 shadow-none badge-admin-theme">
              Admin Response
            </Badge>
            <p className="mb-0 italic small dynamic-text opacity-75">{post.adminReply}</p>
          </div>
        ) : (
          <Badge 
            className="bg-transparent border dynamic-text opacity-50" 
            style={{ borderColor: 'var(--feature-border)' }}
          >
            Waiting for owner reply...
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
}