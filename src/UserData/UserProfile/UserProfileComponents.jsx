import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';


export const UserInfoCard = ({ user }) => {
    if (!user) {
        return (
            <Card className="shadow-sm border-0 p-3">
                <p className="text-muted text-center mb-0">
                    No user data found. Please log in.
                </p>
            </Card>
        );
    }
   return (
        <Card className="shadow-sm border-0 mb-4 overflow-hidden">
            <div style={{ height: '8px', backgroundColor: '#198754' }} /> 
            <Card.Body>
                <div className="text-center mb-3">
                    <div className="rounded-circle bg-light d-inline-block p-3 mb-2" style={{ width: '70px', height: '70px' }}>
                        <span style={{ fontSize: '2rem' }}>👤</span>
                    </div>
                    <Card.Title className="h4 mb-0">{user.username}</Card.Title>
                    <Badge bg="success" className="mt-1">Active Member</Badge>
                </div>

                <hr />

                <ListGroup variant="flush" className="small">
                    <ListGroup.Item className="px-0 py-2 border-0">
                        <span className="text-muted d-block text-uppercase" style={{ fontSize: '0.65rem' }}>Email Address</span>
                        <strong>{user.email}</strong>
                    </ListGroup.Item>

                    <ListGroup.Item className="px-0 py-2 border-0">
                        <span className="text-muted d-block text-uppercase" style={{ fontSize: '0.65rem' }}>Phone Number</span>
                        <strong>{user.phone || 'Not provided'}</strong>
                    </ListGroup.Item>

                    <ListGroup.Item className="px-0 py-2 border-0">
                        <span className="text-muted d-block text-uppercase" style={{ fontSize: '0.65rem' }}>Account Status</span>
                        <span className="text-success fw-bold">● Online</span>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};