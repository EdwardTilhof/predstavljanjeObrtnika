import React, { useState, useEffect, useRef } from 'react';
import { Container, Table, Button, Form, InputGroup, Card, Badge, Modal } from 'react-bootstrap';
import { useDataSource } from "../DataSource/DataSourceContext";
import { mainCategories } from '../components/CooperatingPartners/CooperatingPartnersData/CooperatingPartnersMainCategoriesData';

const CooperatingPartnersCategoryChange = () => {
    const { dataSource } = useDataSource();
    const isInitialMount = useRef(true);

    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [tempName, setTempName] = useState("");
    const [newName, setNewName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [targetCategory, setTargetCategory] = useState(null);

   useEffect(() => {
    const loadData = () => {
        if (dataSource === 'memory') {
            setCategories(mainCategories);
        } else {
            const saved = localStorage.getItem('globalCategories');
            if (saved) {
                setCategories(JSON.parse(saved));
            } else {
                setCategories(mainCategories);
            }
        }
    };
    
    loadData();
}, [dataSource]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (dataSource !== 'memory') {
            localStorage.setItem('globalCategories', JSON.stringify(categories));
            window.dispatchEvent(new Event("categoriesUpdated"));
        }
    }, [categories, dataSource]);

    const handleDeleteClick = (cat) => {
        setTargetCategory(cat);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (targetCategory) {
            setCategories(prev => prev.filter(cat => cat.id !== targetCategory.id));
            if (editingId === targetCategory.id) {
                setEditingId(null);
                setTempName("");
            }
        }
        setShowModal(false);
        setTargetCategory(null);
    };

    const handleAddCategory = () => {
        if (!newName.trim()) return;

        const numericIds = categories
            .map(c => {
                const num = parseInt(String(c.id).replace(/\D/g, ''));
                return isNaN(num) ? 0 : num;
            });

        const nextNumber = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;

        setCategories(prev => [...prev, { id: `cat${nextNumber}`, name: newName.trim() }]);
        setNewName("");
    };

    const saveEdit = (id) => {
        if (!tempName.trim()) return;
        setCategories(prev => prev.map((cat) =>
            cat.id === id ? { ...cat, name: tempName.trim() } : cat
        ));
        setEditingId(null);
        setTempName("");
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="dynamic-heading">Manage Categories</h2>
                <Badge bg={dataSource === 'memory' ? "info" : "success"}>
                    Source: {dataSource}
                </Badge>
            </div>

            <Table striped bordered hover responsive className="custom-card shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id} className={editingId === cat.id ? "table-primary" : ""}>
                            <td className="align-middle">
                                <strong>{cat.name}</strong>
                                {editingId === cat.id && <small className="ms-2 text-muted">(Editing...)</small>}
                            </td>
                            <td className="align-middle" style={{ width: '150px' }}>
                                <div className="d-flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline-primary"
                                        disabled={editingId === cat.id}
                                        onClick={() => {
                                            setEditingId(cat.id);
                                            setTempName(cat.name);
                                            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button size="sm" variant="outline-danger" onClick={() => handleDeleteClick(cat)}>
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Card className={`mt-4 border shadow-sm ${editingId ? "border-primary" : ""}`}>
                <Card.Body>
                    <h5 className="mb-3">{editingId ? "Edit Category" : "Add New Category"}</h5>
                    <InputGroup>
                        <Form.Control
                            placeholder="e.g., Consulting"
                            value={editingId ? tempName : newName}
                            onChange={(e) => editingId ? setTempName(e.target.value) : setNewName(e.target.value)}
                            autoFocus={!!editingId}
                        />
                        {editingId ? (
                            <>
                                <Button variant="success" onClick={() => saveEdit(editingId)}>Save Changes</Button>
                                <Button variant="secondary" onClick={() => { setEditingId(null); setTempName(""); }}>Cancel</Button>
                            </>
                        ) : (
                            <Button variant="primary" onClick={handleAddCategory}>Add Category</Button>
                        )}
                    </InputGroup>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center py-4">
                    <h5>Are you sure?</h5>
                    <p>Remove <strong>{targetCategory?.name}</strong> from your categories?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CooperatingPartnersCategoryChange;