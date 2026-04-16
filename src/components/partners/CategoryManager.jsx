import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { createUniqueId } from "../../../dataRepository/UUIDGenerator";
import { mainCategories as defaultCategories } from "../../../dataRepository/partnersData/PartnersData";
import DeleteConfirmationModal from "../../crossPageComponents/modal/DeleteConfirmationModal"; 

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [newName, setNewName] = useState("");
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [targetItem, setTargetItem] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('globalCategories');
        setCategories(saved ? JSON.parse(saved) : defaultCategories);
    }, []);

    const saveToStorage = (updatedList) => {
        setCategories(updatedList);
        localStorage.setItem('globalCategories', JSON.stringify(updatedList));
    };

    const handleAdd = () => {
        if (!newName.trim()) return;
        const updated = [...categories, { id: createUniqueId('category'), name: newName.trim() }];
        saveToStorage(updated);
        setNewName("");
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

    const handleDeleteClick = (item) => {
        setTargetItem(item);   
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
                        <th>ID</th>
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
                            <td><small className="text-muted">{cat.id}</small></td>
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
            />
        </div>
    );
};

export default CategoryManager;