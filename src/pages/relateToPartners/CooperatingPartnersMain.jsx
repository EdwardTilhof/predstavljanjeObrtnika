import React, { useEffect, useState, useCallback } from "react";
import { Table, Badge, Button, Stack, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import { ROUTES, DATA_SOURCE } from "../../Constants";
import CooperatingPartnerLogic from "../../components/partners/CooperatingPartnersLogic";
import { useDataSource } from "../../dataSource/DataSourceContext";
import { mainCategories } from "../../../dataRepository/partnersData/PartnersData";
import { regions as defaultRegions } from "../../../dataRepository/locations/RegionsData";

import DeleteConfirmationModal from "../../crossPageComponents/modal/DeleteConfirmationModal";
import useBreakpoint from "../../crossPageComponents/hooks/useBreakpoint";

const CooperatingPartnersMain = ({ selectedCategory }) => {
  const { user, isLoaded } = useUser();

  const isDevAdmin = localStorage.getItem("dev_admin") === "true";
  const isEditor = isDevAdmin || (isLoaded && (user?.publicMetadata?.role === 'admin' || user?.publicMetadata?.role === 'editor'));

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [targetPartner, setTargetPartner] = useState(null);
  const { partners, setPartners } = useDataSource();

  const [allCategories, setAllCategories] = useState([]);
  const [allRegions, setAllRegions] = useState([]);

  useEffect(() => {
    const savedCats = localStorage.getItem('globalCategories');
    setAllCategories(savedCats ? JSON.parse(savedCats) : mainCategories);

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

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';

  const renderPartnerCard = (cp) => (
    <Col xs={12} key={cp.id} className="mb-3">
      <Card className="shadow-sm border">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="mb-0 text-primary">{cp.company}</h5>
            <Badge bg="info" text="dark">
              {allCategories.find(c => String(c.id) === String(cp.category))?.name || "Uncategorized"}
            </Badge>
          </div>
          <p className="fw-bold mb-1">{cp.titles?.join(", ") || cp.title || "N/A"}</p>
          <hr />
          <Row className="small text-muted">
            <Col xs={6}><strong>Region:</strong> {cp.regions?.map(id => allRegions.find(r => String(r.id) === String(id))?.name).filter(Boolean).join(", ") || "N/A"}</Col>
            <Col xs={6}><strong>Investment:</strong> {cp.cost} EUR</Col>
            <Col xs={6} className="mt-2"><strong>Duration:</strong> {cp.duration} days</Col>
            <Col xs={6} className="mt-2"><strong>Contact:</strong> {cp.contact}</Col>
          </Row>

          {isEditor && (
            <Stack direction="horizontal" gap={2} className="mt-3 justify-content-end">
              <Link to={ROUTES.changeCooperatingPartner.replace(':id', cp.id)} className="btn btn-secondary btn-sm">Edit</Link>
              <Button variant="outline-danger" size="sm" onClick={() => { setTargetPartner(cp); setShowModal(true); }}>Remove</Button>
            </Stack>
          )}
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div className="mt-4">
      {isMobile ? (
        <Row>
          {filteredPartners.length > 0 ? filteredPartners.map(renderPartnerCard) : (
            <Col className="text-center py-4 text-muted">No partners found.</Col>
          )}
        </Row>
      ) : (
        <Table hover responsive className="shadow-sm border align-middle">
          <thead className="table-dark">
            <tr>
              <th>Work title</th>
              <th>Category</th>
              <th>Company</th>
              <th>Regions</th>
              <th>Cost</th>
              <th>Duration</th>
              <th>Contact</th>
              {isEditor && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredPartners.map((cp) => (
              <tr key={cp.id}>
                <td className="fw-bold">{cp.titles?.join(", ") || cp.title || "N/A"}</td>
                <td><Badge bg="info" text="dark">{allCategories.find(c => String(c.id) === String(cp.category))?.name || "Uncategorized"}</Badge></td>
                <td>{cp.company}</td>
                <td>{cp.regions?.map(id => allRegions.find(r => String(r.id) === String(id))?.name).filter(Boolean).join(", ") || "N/A"}</td>
                <td>{cp.cost} EUR</td>
                <td>{cp.duration} days</td>
                <td>{cp.contact}</td>
                {isEditor && (
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
      )}

      {isEditor && (
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
    </div>
  );
};

export default CooperatingPartnersMain;