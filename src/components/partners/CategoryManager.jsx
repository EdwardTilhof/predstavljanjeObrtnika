import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import DeleteConfirmationModal from "../../crossPageComponents/modal/DeleteConfirmationModal";
import dataFacade from "../../services/dataFacade";

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [newName, setNewName] = useState("");
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [targetItem, setTargetItem] = useState(null);
    const [usageList, setUsageList] = useState([]);

    const loadData = async () => {
        const data = await dataFacade.getCategories();
        setCategories(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAdd = async () => {
        if (!newName.trim()) return;
        await dataFacade.addCategory({ name: newName.trim() });
        setNewName("");
        await loadData();
    };

    const startEdit = (cat) => {
        setEditId(cat.id);
        setEditName(cat.name);
    };

    const handleSaveEdit = () => {
        const updated = categories.map(cat =>
            cat.id === editId ? { ...cat, name: editName } : cat
        );
        saveToStorage(updated);
        setEditId(null);
    };

    const handleDeleteClick = (cat) => {
    setTargetItem(cat);
    
    const savedPartners = JSON.parse(localStorage.getItem('my_app_CooperatingPartners') || '[]');
    
    const usingItems = savedPartners
        .filter(p => p.category === cat.id)
        .map(p => `Partner: ${p.company}`);

    setUsageList(usingItems);
    setShowDeleteModal(true);
};

    const handleConfirmDelete = () => {
        if (targetItem) {
            const updated = categories.filter(cat => cat.id !== targetItem.id);
            saveToStorage(updated);
        }
        setShowDeleteModal(false);
        setTargetItem(null);
    };

    return (
        <div>
            <InputGroup className="mb-4">
                <Form.Control
                    placeholder="Add new category..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <Button variant="success"
                    onClick={handleAdd}>Add</Button>
            </InputGroup>

            <Table hover responsive className="align-middle">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat => (
                        <tr key={cat.id}>
                            <td>
                                {editId === cat.id ? (
                                    <Form.Control
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        size="sm"
                                    />
                                ) : (
                                    <strong>{cat.name}</strong>
                                )}
                            </td>
                            <td className="text-end">
                                {editId === cat.id ? (
                                    <>
                                        <Button variant="primary" size="sm" className="me-2"
                                            onClick={handleSaveEdit}>
                                            <i className="bi bi-check-lg"></i>
                                        </Button>
                                        <Button variant="secondary" size="sm"
                                            onClick={() => setEditId(null)}>
                                            <i className="bi bi-x-lg"></i>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="outline-primary" size="sm" className="me-2"
                                            onClick={() => startEdit(cat)}>
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                        <Button variant="outline-danger" size="sm"
                                            onClick={() => handleDeleteClick(cat)}>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                itemName={targetItem?.name}
                usageList={usageList}
            />
        </div>
    );
};

export default CategoryManager;