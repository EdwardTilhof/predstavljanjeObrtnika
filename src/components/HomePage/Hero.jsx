import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Constants';
import { HERO_CONTENT } from './ConstantsHome'; 
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import HomeAnimation from '../../assets/Home element.lottie';

export default function Hero() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduce-motion: reduce)').matches;

  return (
    <Row className="align-items-center py-5 my-5">
      <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
        <h1 className="display-3 fw-bold mb-3 dynamic-heading">
          {HERO_CONTENT.title}
        </h1>
        
        <p className="lead mb-4 dynamic-text">
          {HERO_CONTENT.subtitle}
        </p>
        
        <Button 
          as={Link} 
          to={ROUTES.OUR_PROJECTS} 
          variant="primary" 
          size="lg" 
          className="px-4 py-2 shadow"
          aria-label={`Navigate to ${HERO_CONTENT.buttonText} page`}
        >
          {HERO_CONTENT.buttonText}
        </Button>
      </Col>
      
      <Col lg={6}>
        <div className="rounded-4 shadow-lg overflow-hidden" role="img" aria-label="Home page animation">
          <DotLottieReact
            src={HomeAnimation}
            loop={!prefersReducedMotion}
            autoplay={!prefersReducedMotion}
          />
        </div>
      </Col>
    </Row>
  );
}