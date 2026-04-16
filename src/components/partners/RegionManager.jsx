import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { createUniqueId } from "../../../dataRepository/UUIDGenerator";
import { regions as defaultRegions } from "../../../dataRepository/locations/RegionsData";
// Path updated as per your instruction
import DeleteConfirmationModal from "../../crossPageComponents/modal/DeleteConfirmationModal"; 

const RegionManager = () => {
    const [regions, setRegions] = useState([]);
    const [newName, setNewName] = useState("");

    // State for editing
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    // Modal States
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

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

    const handleDeleteClick = (region) => {
        setItemToDelete(region);
        setShowDeleteModal(true);
    };

    // Corrected logic: Filters the list and updates storage
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
                        <th>ID (UUID)</th>
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
                            <td><small className="text-muted">{reg.id}</small></td>
                            <td className="text-end">
                                {editId === reg.id ? (
                                    <>
                                        <Button variant="primary" size="sm" className="me-2" onClick={handleSaveEdit}>Save</Button>
                                        <Button variant="secondary" size="sm" onClick={() => setEditId(null)}>Cancel</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="outline-primary"
                                            size="sm" className="me-2"
                                            onClick={() => startEdit(reg)}>Edit</Button>
                                        <Button variant="outline-danger" size="sm"
                                            onClick={() => handleDeleteClick(reg)}>Delete</Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Added the Modal component here */}
            <DeleteConfirmationModal 
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                itemName={itemToDelete?.name}
            />
        </div>
    );
};

export default RegionManager;