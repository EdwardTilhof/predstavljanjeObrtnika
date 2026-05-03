import React from 'react';
import { Link } from 'react-router-dom';

const AboutUsContainer = () => {
  return (
    <div className="p-5 shadow-sm text-center mt-4 custom-card">
      <h2 className="mb-3 dynamic-heading fw-bold">Discover the Team Behind the Solutions</h2>
      <p className="feature-text-muted mb-4 fs-5">
        Learn more about the vision and passion driving our IT & Software, Design, Infrastructure, and Marketing projects.
      </p>
      <Link to="/aboutUs" className="btn btn-primary btn-lg px-5 shadow-sm">
        About Us
      </Link>
    </div>
  );
};

export default AboutUsContainer;