import React, { useState, useEffect, useRef } from 'react';
import { Container, Table, Button, Form, InputGroup, Card, Badge, Modal, Spinner } from 'react-bootstrap';
import { useDataSource } from "../DataSource/DataSourceContext";
import { regions as defaultRegions } from "../DataSource/regionData";

const RegionsCategoryAdd = () => {
    const { dataSource } = useDataSource();
    const isInitialMount = useRef(true);

    const [regions, setRegions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [tempName, setTempName] = useState("");
    const [newName, setNewName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [targetRegion, setTargetRegion] = useState(null);

    useEffect(() => {
        const loadData = () => {
            setIsLoading(true);
            setTimeout(() => {
                if (dataSource === 'memory') {
                    setRegions(defaultRegions);
                } else {
                    const saved = localStorage.getItem('globalRegions');
                    setRegions(saved ? JSON.parse(saved) : defaultRegions);
                }
                setIsLoading(false);
            }, 200);
        };
        loadData();
    }, [dataSource]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        if (dataSource !== 'memory') {
            localStorage.setItem('globalRegions', JSON.stringify(regions));
            window.dispatchEvent(new Event("regionsUpdated"));
        }
    }, [regions, dataSource]);

    // Handlers
    const handleAddRegion = () => {
        if (!newName.trim()) return;
        const numericIds = regions.map(r => parseInt(String(r.id).replace(/\D/g, '')) || 0);
        const nextNumber = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
        setRegions(prev => [...prev, { id: `reg${nextNumber}`, name: newName.trim() }]);
        setNewName("");
    };

    const saveEdit = (id) => {
        if (!tempName.trim()) return;
        setRegions(prev => prev.map(reg => reg.id === id ? { ...reg, name: tempName.trim() } : reg));
        setEditingId(null);
        setTempName("");
    };

    const confirmDelete = () => {
        if (targetRegion) {
            setRegions(prev => prev.filter(reg => reg.id !== targetRegion.id));
            if (editingId === targetRegion.id) {
                setEditingId(null);
                setTempName("");
            }
        }
        setShowModal(false);
        setTargetRegion(null);
    };

    if (isLoading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Loading regions...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="dynamic-heading">Manage Operating Regions</h2>
                <Badge bg={dataSource === 'memory' ? "info" : "success"}>
                    Source: {dataSource}
                </Badge>
            </div>

            {/* SCROLLABLE TABLE CONTAINER */}
            <div 
                className="custom-card shadow-sm border rounded" 
                style={{ 
                    maxHeight: "350px", 
                    overflowY: "auto",
                    backgroundColor: "var(--bs-body-bg)"
                }}
            >
                <Table striped bordered hover responsive className="mb-0">
                    <thead className="table-dark" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                        <tr>
                            <th>Region Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regions.map((reg) => (
                            <tr key={reg.id} className={editingId === reg.id ? "table-primary" : ""}>
                                <td className="align-middle">
                                    <strong>{reg.name}</strong>
                                    {editingId === reg.id && <small className="ms-2 text-muted">(Editing...)</small>}
                                </td>
                                <td className="align-middle" style={{ width: '150px' }}>
                                    <div className="d-flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline-primary"
                                            disabled={editingId === reg.id}
                                            onClick={() => {
                                                setEditingId(reg.id);
                                                setTempName(reg.name);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="outline-danger" 
                                            onClick={() => { setTargetRegion(reg); setShowModal(true); }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Card className={`mt-4 border shadow-sm ${editingId ? "border-primary" : ""}`}>
                <Card.Body>
                    <h5 className="mb-3">{editingId ? "Edit Region" : "Add New Region"}</h5>
                    <InputGroup>
                        <Form.Control
                            placeholder="e.g., Central Europe"
                            value={editingId ? tempName : newName}
                            onChange={(e) => editingId ? setTempName(e.target.value) : setNewName(e.target.value)}
                            autoFocus={!!editingId}
                        />
                        {editingId ? (
                            <>
                                <Button variant="success" className="ms-2" onClick={() => saveEdit(editingId)}>Save</Button>
                                <Button variant="secondary" onClick={() => { setEditingId(null); setTempName(""); }}>Cancel</Button>
                            </>
                        ) : (
                            <Button variant="primary" onClick={handleAddRegion}>Add Region</Button>
                        )}
                    </InputGroup>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center py-4">
                    <h5>Remove Region?</h5>
                    <p>Remove <strong>{targetRegion?.name}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default RegionsCategoryAdd;