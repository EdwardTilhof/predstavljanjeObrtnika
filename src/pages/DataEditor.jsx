import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Row, Col, Card } from 'react-bootstrap';

import CategoryManager from '../components/partners/CategoryManager'; 
import RegionManager from '../components/partners/RegionManager';

const DataEditor = () => {
    return (
        <Container className="mt-5 mb-5">
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-primary-transparent text-white p-4">
                    <h2 className="mb-0 text-color">System Data Editor</h2>
                    <p className="mb-0 text-color opacity-75">Manage global categories and operating regions</p>
                </Card.Header>
                <Card.Body className="p-4">
                    <Tabs
                        defaultActiveKey="categories"
                        id="data-editor-tabs"
                        className="mb-4 custom-tabs"
                        fill
                    >
                        <Tab eventKey="categories" title="📁 Main Categories">
                            <div className="py-3">
                                <CategoryManager />
                            </div>
                        </Tab>
                        <Tab eventKey="regions" title="📍 List of Regions">
                            <div className="py-3">
                                <RegionManager />
                            </div>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DataEditor;