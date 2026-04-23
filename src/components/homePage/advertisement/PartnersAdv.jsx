import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import CooperatingPartnerLogic from '../../partners/CooperatingPartnersLogic';
import PardnerAdvCard from './PardnerAdvCard';

const PartnersAdv = () => {
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Show 3 cards per row

  const fetchPartners = async () => {
    const res = await CooperatingPartnerLogic.getAll('localStorage');
    if (res.success) {
      setPartners(res.data);
    }
  };

  useEffect(() => {
    fetchPartners();
    window.addEventListener("partnersUpdated", fetchPartners);
    return () => window.removeEventListener("partnersUpdated", fetchPartners);
  }, []);

  // Sort and paginate data
  const processedPartners = useMemo(() => {
    const sorted = [...partners].sort((a, b) => {
      const impA = Number(a.importanceValue) || 1;
      const impB = Number(b.importanceValue) || 1;
      
      // 1. Sort by importance value
      if (impA !== impB) {
        return impB - impA; 
      }
      
      const nameA = a.company || "";
      const nameB = b.company || "";
      return nameA.localeCompare(nameB);
    });

    return sorted;
  }, [partners]);

  // Pagination Logic
  const totalPages = Math.ceil(processedPartners.length / itemsPerPage);
  const currentPartners = processedPartners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="my-5">
      <h2 className="text-center mb-0">Our Partners:</h2>
      <h6 className="text-centered mb-8"> If you wish to learn more about a partner click on the image</h6>
      
      {/* Cards Row */}
      <Row className="g-4 justify-content-center">
        {currentPartners.map((partner) => (
          <Col key={partner.id} xs={12} sm={6} md={4}>
            <PardnerAdvCard partner={partner} />
          </Col>
        ))}
      </Row>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />

          {(() => {
            const items = [];
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPages, currentPage + 1);

            items.push(
              <Pagination.Item key={1} active={1 === currentPage} onClick={() => setCurrentPage(1)}>
                1
              </Pagination.Item>
            );

            if (startPage > 2) {
              items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
            }

            for (let i = startPage; i <= endPage; i++) {
              if (i !== 1 && i !== totalPages) {
                items.push(
                  <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
                    {i}
                  </Pagination.Item>
                );
              }
            }

            if (endPage < totalPages - 1) {
              items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
            }

            if (totalPages > 1) {
              items.push(
                <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </Pagination.Item>
              );
            }

            return items;
          })()}

          <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      )}
    </section>
  );
};

export default PartnersAdv;