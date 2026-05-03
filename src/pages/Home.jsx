import { Container } from 'react-bootstrap';
import '../colorsAndDesign/SiteColors';
import '../colorsAndDesign/ColorsStyle.css';
import Hero from '../components/HomePage/Hero';
import Features from '../components/HomePage/Features';
import PartnersAdv from '../components/homePage/advertisement/PartnersAdv';
import AboutUsContainer from '../components/homePage/AboutUsContainer';

export default function Home() {
  return (
    <Container className="d-flex flex-column gap-3 mb-5">
      <Hero />
     
      <Features />

      <hr />

      <AboutUsContainer />
     
      <PartnersAdv />



      <div className="py-5"></div>
    </Container>
  );
}