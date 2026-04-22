import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';

const PardnerAdvCard = ({ partner }) => {
  return (
    <Link to={ROUTES.PartnerDetailsAdv.replace(':id', partner.id)} className="text-decoration-none">
      <Card className="h-100 shadow-sm border-0">
        <Card.Img 
          variant="top" 
          src={partner.companyImage} 
          alt={partner.company} 
          style={{ height: '150px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title className="text-primary mb-1">
            {partner.titles[0]}
          </Card.Title>
          <Card.Text className="text-muted fw-bold">
            {partner.company}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PardnerAdvCard;