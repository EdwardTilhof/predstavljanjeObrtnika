import { Row, Col } from 'react-bootstrap';
import { FEATURE_LIST } from './ConstantsHome';

export default function Features() {
  return (
    <Row className="py-5 rounded-4 px-3" style={{ backgroundColor: 'var(--bs-tertiary-bg)' }}>
      <Col xs={12} className="text-center mb-5">
        <h2 className="fw-bold text-uppercase tracking-wider">Why Choose Us</h2>
      </Col>
      
      {FEATURE_LIST.map((feature) => (
        <Col key={feature.id} md={4} className="mb-4 text-center">
          <div 
            className="fs-1 mb-3" 
            style={{ color: 'var(--feature-icon-color)' }}
          >
            {feature.icon}
          </div>
          
          <h4 className="fw-bold">{feature.title}</h4>
          
          <p style={{ color: 'var(--feature-text-muted)' }}>
            {feature.text}
          </p>
        </Col>
      ))}
    </Row>
  );
}