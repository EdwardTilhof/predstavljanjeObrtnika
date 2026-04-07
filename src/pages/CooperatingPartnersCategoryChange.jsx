import React, { useState, useEffect, useRef } from 'react';
import { Container, Table, Button, Form, InputGroup, Card, Badge } from 'react-bootstrap';
import { useDataSource } from "../DataSource/DataSourceContext"; 
import { mainCategories } from '../components/CooperatingPartners/CooperatingPartnersData/CooperatingPartnersMainCategoriesData';

const CooperatingPartnersCategoryChange = () => {
    const { dataSource } = useDataSource();
    const isInitialMount = useRef(true);

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('globalCategories');
        if (saved && dataSource !== 'memory') {
            return JSON.parse(saved);
        }
        return mainCategories;
    });

    const [editingId, setEditingId] = useState(null);
    const [tempName, setTempName] = useState("");
    const [newName, setNewName] = useState("");

    useEffect(() => {
        if (dataSource === 'memory') {
            setCategories(mainCategories);
        } else {
            const saved = localStorage.getItem('globalCategories');
            setCategories(saved ? JSON.parse(saved) : mainCategories);
        }
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


    const handleAddCategory = () => {
        if (!newName.trim()) return;
        const nextNumber = categories.length > 0 
            ? Math.max(...categories.map(c => parseInt(c.id.replace('cat', '')) || 0)) + 1 
            : 1;
        
        setCategories([...categories, { id: `cat${nextNumber}`, name: newName }]);
        setNewName("");
    };

    const saveEdit = (id) => {
        setCategories(categories.map((cat) => 
            cat.id === id ? { ...cat, name: tempName } : cat
        ));
        setEditingId(null);
        setTempName("");
    };

    const deleteCategory = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            setCategories(categories.filter(cat => cat.id !== id));
        }
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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id}>
                            <td className="align-middle">{cat.id}</td>
                            <td className="align-middle">
                                {editingId === cat.id ? (
                                    <Form.Control 
                                        value={tempName} 
                                        onChange={(e) => setTempName(e.target.value)} 
                                        autoFocus
                                    />
                                ) : (
                                    cat.name
                                )}
                            </td>
                            <td className="align-middle">
                                {editingId === cat.id ? (
                                    <Stack direction="horizontal" gap={2}>
                                        <Button size="sm" variant="success" onClick={() => saveEdit(cat.id)}>Save</Button>
                                        <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                                    </Stack>
                                ) : (
                                    <div className="d-flex gap-2">
                                        <Button size="sm" variant="outline-primary" onClick={() => {
                                            setEditingId(cat.id); 
                                            setTempName(cat.name);
                                        }}>Edit</Button>
                                        <Button size="sm" variant="outline-danger" onClick={() => deleteCategory(cat.id)}>Delete</Button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Card className="mt-4 border shadow-sm">
                <Card.Body>
                    <h5 className="mb-3">Add New Category</h5>
                    <InputGroup>
                        <Form.Control 
                            placeholder="e.g., Consulting" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                        />
                        <Button variant="primary" onClick={handleAddCategory}>Add Category</Button>
                    </InputGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CooperatingPartnersCategoryChange;