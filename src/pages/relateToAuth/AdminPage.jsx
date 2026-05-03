import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Form, Badge } from 'react-bootstrap';
import RoleCheck from '../../Permissions/RoleCheck';
import { ROLES } from '../../Permissions/PermissonsConst';
import dataFacade from '../../services/dataFacade'; 

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all users when the page loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await dataFacade.getUsers();
      setUsers(fetchedUsers || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (user, newRole) => {
    try {
      const updatedUser = { ...user, role: newRole };
      
      await dataFacade.updateUser(user.id, updatedUser); 
      
      setUsers(users.map(u => (u.id === user.id ? updatedUser : u)));
    } catch (error) {
      console.error("Failed to update role:", error);
      alert("Error updating user role.");
    }
  };

  return (
    <RoleCheck minRole="ADMIN">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Admin Control Panel</h1>
          <Badge bg="primary" fs="5">Total Users: {users.length}</Badge>
        </div>
        
        <p className="text-muted">Manage user accounts and permissions.</p>

        <Card className="shadow-sm">
          <Card.Body className="p-0">
            {loading ? (
              <div className="p-4 text-center">Loading users...</div>
            ) : (
              <Table responsive hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Current Role</th>
                    <th>Promote / Demote</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id || user.username}>
                      <td className="align-middle fw-bold">{user.username}</td>
                      <td className="align-middle">{user.firstName} {user.lastName}</td>
                      <td className="align-middle">{user.email}</td>
                      <td className="align-middle">{user.phone}</td>
                      <td className="align-middle">
                        <Badge 
                          bg={user.role === 'ADMIN' ? 'danger' : user.role === 'MODERATOR' ? 'warning' : 'secondary'}
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="align-middle" style={{ width: '150px' }}>
                        <Form.Select 
                          value={user.role} 
                          onChange={(e) => handleRoleChange(user, e.target.value)}
                          size="sm"
                        >
                          {/* Dynamically generate options from your ROLES constant */}
                          {Object.values(ROLES).map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>
                  ))}
                  
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </RoleCheck>
  );
};

export default AdminPage;