import React from 'react';
import '../../colorsAndDesign/SiteColors'; 
import '../../colorsAndDesign/ColorsStyle.css';

const AboutUs = () => {
  return (
    <div className="MainContainerAboutUs py-auto pt-5">
      
      {/* Motivational Hero Section */}
      <section className="text-center mb-5">
        <div className="container" style={{ maxWidth: '600px' }}>
          <h1 className="dynamic-heading display-4 mb-4 fw-bold">
            Building the Foundation for Tomorrow
          </h1>
          
          <p className="dynamic-text fs-5 mb-3">
            Every great project starts with a simple idea, but bringing it to life takes precision, passion, and a unified vision. We believe that true innovation happens at the intersection of different disciplines.
          </p>
          <p className="dynamic-text fs-5 mb-4">
            By seamlessly integrating IT & Software, Design, Infrastructure, and Marketing, we don't just solve problems—we engineer growth. Our mission is to empower our partners with robust solutions that inspire and endure. We are more than just a service provider; we are the architects of your digital and physical success.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="text-center py-4">
        <h2 className="dynamic-heading mb-4">Our Core Values</h2>
        
        <div className="d-flex justify-content-center flex-wrap gap-3 fs-5 fw-medium dynamic-text">
          <span>Innovation</span>
          <span className="text-muted">•</span>
          <span>Integrity</span>
          <span className="text-muted">•</span>
          <span>Collaboration</span>
          <span className="text-muted">•</span>
          <span>Excellence</span>
        </div>
      </section>
      
    </div>
  );
};

export default AboutUs;