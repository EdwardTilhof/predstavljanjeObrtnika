import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Constants';
import { HERO_CONTENT } from './ConstantsHome'; 
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import HomeAnimation from '../../assets/Home element.lottie';

export default function Hero() {
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
        >
          {HERO_CONTENT.buttonText}
        </Button>
      </Col>
      
      <Col lg={6}>
        <div className="rounded-4 shadow-lg overflow-hidden">
          <DotLottieReact
            src={HomeAnimation}
            loop
            autoplay
          />
        </div>
      </Col>
    </Row>
  );
}