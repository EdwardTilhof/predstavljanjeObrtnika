import React, { useEffect, useState, useCallback } from "react";
import { Table, Badge, Button, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import CooperatingPartnerLogic from "../../components/partners/CooperatingPartnersLogic";
import { useDataSource } from "../../dataSource/DataSourceContext";
import DeleteConfirmationModal from "../../crossPageComponents/modal/DeleteConfirmationModal";
import { ROLE_RANKS } from "../../Permissions/PermissonsConst";

const CooperatingPartnersMain = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [targetPartner, setTargetPartner] = useState(null);
  const { partners, setPartners } = useDataSource();

  const [allCategories, setAllCategories] = useState([]);
  const [allRegions, setAllRegions] = useState([]);

  // Get User Rank
  const userRole = localStorage.getItem('user_role') || 'GUEST';
  const userRank = ROLE_RANKS[userRole];

  useEffect(() => {
    const savedCats = localStorage.getItem('globalCategories');
    const savedRegs = localStorage.getItem('globalRegions');
    if (savedCats) setAllCategories(JSON.parse(savedCats));
    if (savedRegs) setAllRegions(JSON.parse(savedRegs));
  }, []);

  const confirmDelete = async () => {
    if (targetPartner) {
      const result = await CooperatingPartnerLogic.remove(targetPartner.id, 'localStorage');
      if (result.success) {
        setPartners(prev => prev.filter(p => p.id !== targetPartner.id));
        setShowModal(false);
      }
    }
  };

  const filteredPartners = selectedCategory === "All" 
    ? partners 
    : partners.filter(p => String(p.category) === String(selectedCategory));

  return (
    <>
      <Table striped bordered hover responsive className="shadow-sm mt-3">
        <thead>
          <tr>
            <th>Service</th>
            <th>Category</th>
            <th>Company</th>
            <th>Regions</th>
            <th>Cost</th>
            <th>Duration</th>
            <th>Contact</th>
            {/* Header must match body logic */}
            {userRank >= ROLE_RANKS.MODERATOR && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredPartners.map((cp) => (
            <tr key={cp.id}>
              <td className="fw-bold">{cp.titles?.join(", ") || cp.title || "N/A"}</td>
              <td>
                <Badge bg="info" text="dark">
                  {allCategories.find(c => String(c.id) === String(cp.category))?.name || "Uncategorized"}
                </Badge>
              </td>
              <td>{cp.company}</td>
              <td>
                {cp.regions?.map(id => allRegions.find(r => String(r.id) === String(id))?.name).filter(Boolean).join(", ") || "N/A"}
              </td>
              <td>{cp.cost} EUR</td>
              <td>{cp.duration} days</td>
              <td>{cp.contact}</td>
              
              {userRank >= ROLE_RANKS.MODERATOR && (
                <td>
                  <Stack direction="horizontal" gap={2}>
                    <Link to={ROUTES.changeCooperatingPartner.replace(':id', cp.id)} className="btn btn-secondary btn-sm">Edit</Link>
                    <Button variant="outline-danger" size="sm" onClick={() => { setTargetPartner(cp); setShowModal(true); }}>Remove</Button>
                  </Stack>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {userRank >= ROLE_RANKS.MODERATOR && (
        <Button variant="primary" className="mt-3" onClick={() => navigate(ROUTES.newCooperatingPartner)}>
          Add New Partner
        </Button>
      )}

      <DeleteConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDelete}
        itemName={targetPartner?.company}
      />
    </>
  );
};

export default CooperatingPartnersMain;