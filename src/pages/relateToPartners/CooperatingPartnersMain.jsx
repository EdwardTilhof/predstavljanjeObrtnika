import React, { useEffect, useState, useCallback } from "react";
import { Table, Badge, Button, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES, DATA_SOURCE } from "../../Constants";
import CooperatingPartnerLogic from "../../components/partners/CooperatingPartnersLogic";
import { useDataSource } from "../../dataSource/DataSourceContext";

// Import defaults
import { mainCategories } from "../../../dataRepository/partnersData/PartnersData";
import { regions as defaultRegions } from "../../../dataRepository/locations/RegionsData";

// Modal component for delete confirmation
import DeleteConfirmationModal from "../../crossPageComponents/modal/DeleteConfirmationModal";

const CooperatingPartnersMain = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [targetPartner, setTargetPartner] = useState(null);
  const { partners, setPartners } = useDataSource();

  // --- NEW STATE FOR DYNAMIC DATA ---
  const [allCategories, setAllCategories] = useState([]);
  const [allRegions, setAllRegions] = useState([]);

  useEffect(() => {
    // Load Categories from storage or use defaults
    const savedCats = localStorage.getItem('globalCategories');
    setAllCategories(savedCats ? JSON.parse(savedCats) : mainCategories);

    // Load Regions from storage or use defaults
    const savedRegs = localStorage.getItem('globalRegions');
    setAllRegions(savedRegs ? JSON.parse(savedRegs) : defaultRegions);
  }, []);

  const loadData = useCallback(async (isUpdate = false) => {
    if (DATA_SOURCE === 'memory' && partners.length > 0 && !isUpdate) return;
    try {
      const response = await CooperatingPartnerLogic.getAll();
      if (response.success) setPartners(response.data);
    } catch (err) {
      console.error("Failed to load partners:", err);
    }
  }, [partners.length, setPartners]);

  useEffect(() => {
    loadData();
    const handleRefresh = () => loadData(true);
    window.addEventListener("partnersUpdated", handleRefresh);
    return () => window.removeEventListener("partnersUpdated", handleRefresh);
  }, [loadData]);

  const confirmDelete = async () => {
    if (targetPartner) {
      const res = await CooperatingPartnerLogic.remove(targetPartner.id, DATA_SOURCE, partners);
      if (res.success) {
        setPartners(res.data);
        setShowModal(false);
      }
    }
  };

  const filteredPartners = selectedCategory
    ? partners.filter((p) => String(p.category) === String(selectedCategory))
    : partners;

  return (
    <div className="mt-4">
      <Table hover responsive className="shadow-sm border align-middle">
        <thead className="table-dark">
          <tr>
            <th>Work title</th>
            <th>Category</th>
            <th>Provider</th>
            <th>Region</th>
            <th>Investment</th>
            <th>Duration</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPartners.length > 0 ? (
            filteredPartners.map((cp) => (
              <tr key={cp.id}>
                <td className="fw-bold">{cp.titles?.join(", ") || cp.title || "N/A"}</td>
                
                {/* DYNAMIC CATEGORY LOOKUP */}
                <td>
                  <Badge bg="info" text="dark">
                    {allCategories.find(c => String(c.id) === String(cp.category))?.name || "Uncategorized"}
                  </Badge>
                </td>

                <td>{cp.company}</td>

                {/* DYNAMIC REGION LOOKUP (Handles arrays and IDs) */}
                <td>
                  {cp.regions && cp.regions.length > 0 
                    ? cp.regions.map(regId => 
                        allRegions.find(r => String(r.id) === String(regId))?.name
                      ).filter(Boolean).join(", ") 
                    : "N/A"}
                </td>

                <td>{cp.cost} EUR</td>
                <td>{cp.duration} days</td>
                <td>{cp.contact}</td>

                <td>
                  <Stack direction="horizontal" gap={2}>
                    <Link 
                      to={ROUTES.changeCooperatingPartner.replace(':id', cp.id)} 
                      className="btn btn-secondary btn-sm"
                    >
                      Edit
                    </Link>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => { setTargetPartner(cp); setShowModal(true); }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8" className="text-center text-muted py-4">No partners found.</td></tr>
          )}
        </tbody>
      </Table>
      
      <Button variant="primary" onClick={() => navigate(ROUTES.newCooperatingPartner)}>
        Add New Partner
      </Button>

      <DeleteConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDelete}
        itemName={targetPartner?.company}
      />
    </div>
  );
};

export default CooperatingPartnersMain;