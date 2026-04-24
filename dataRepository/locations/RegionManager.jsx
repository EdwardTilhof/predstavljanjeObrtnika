import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { createUniqueId } from "../UUIDGenerator";
import { regions as defaultRegions } from "./RegionsData";
// Path updated as per your instruction
import DeleteConfirmationModal from "../../src/crossPageComponents/modal/DeleteConfirmationModal";

const RegionManager = () => {
    const [regions, setRegions] = useState([]);
    const [newName, setNewName] = useState("");

    // State for editing
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    // Modal States
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [usageList, setUsageList] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('globalRegions');
        setRegions(saved ? JSON.parse(saved) : defaultRegions);
    }, []);

    const saveAndPersist = (updatedList) => {
        setRegions(updatedList);
        localStorage.setItem('globalRegions', JSON.stringify(updatedList));
    };

    const handleAdd = () => {
        if (!newName.trim()) return;
        const newRegion = { id: createUniqueId('region'), name: newName.trim() };
        saveAndPersist([...regions, newRegion]);
        setNewName("");
    };

    const startEdit = (region) => {
        setEditId(region.id);
        setEditName(region.name);
    };

    const handleSaveEdit = () => {
        const updated = regions.map(r =>
            r.id === editId ? { ...r, name: editName } : r
        );
        saveAndPersist(updated);
        setEditId(null);
    };

   const handleDeleteClick = (reg) => {
    setItemToDelete(reg);
    
    const savedPartners = JSON.parse(localStorage.getItem('my_app_CooperatingPartners') || '[]');
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');

    const partnersUsing = savedPartners
        .filter(p => p.regions && p.regions.includes(reg.id))
        .map(p => `Partner: ${p.company}`);

    const projectsUsing = savedProjects
        .filter(proj => proj.location === reg.name)
        .map(proj => `Project: ${proj.title}`);

    setUsageList([...partnersUsing, ...projectsUsing]);
    setShowDeleteModal(true);
};

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            const updated = regions.filter(r => r.id !== itemToDelete.id);
            saveAndPersist(updated);
        }
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    return (
        <div>
            <InputGroup className="mb-4">
                <Form.Control
                    placeholder="Enter new region name..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <Button variant="success" onClick={handleAdd}>Add Region</Button>
            </InputGroup>

            <Table hover responsive className="align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Region Name</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {regions.map(reg => (
                        <tr key={reg.id}>
                            <td>
                                {editId === reg.id ? (
                                    <Form.Control
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        size="sm"
                                        autoFocus
                                    />
                                ) : (
                                    <strong>{reg.name}</strong>
                                )}
                            </td>
                            <td className="text-end">
                                {editId === reg.id ? (
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
                                            onClick={() => startEdit(reg)}>
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                        <Button variant="outline-danger" size="sm"
                                            onClick={() => handleDeleteClick(reg)}>
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
                itemName={itemToDelete?.name}
                usageList={usageList}
            />
        </div>
    );
};

export default RegionManager;