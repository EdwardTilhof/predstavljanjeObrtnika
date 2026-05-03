import { Row, Col } from 'react-bootstrap';
import { FEATURE_LIST } from './ConstantsHome';

export default function Features() {
  return (
    <div className="p-5 shadow-sm text-center mt-4 border custom-card">
      
      <h2 className="mb-4 dynamic-heading fw-bold">Why Choose Us</h2>
      
      <Row className="mt-4">
        {FEATURE_LIST.map((feature) => (
          <Col key={feature.id} md={4} className="mb-4 text-center">
            <div 
              className="fs-1 mb-3" 
              style={{ color: 'var(--feature-icon-color)' }}
            >
              {feature.icon}
            </div>
            
            <h4 className="fw-bold mb-3">{feature.title}</h4>
            
            <p className="fs-5 mb-0" style={{ color: 'var(--feature-text-muted)' }}>
              {feature.text}
            </p>
          </Col>
        ))}
      </Row>
      
    </div>
  );
}