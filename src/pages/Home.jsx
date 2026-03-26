import { Container } from 'react-bootstrap';
import Hero from '../components/HomePage/Hero';
import Features from '../components/HomePage/Features';

export default function Home() {
  return (
    <Container className="d-flex flex-column gap-5 mb-5">
      <Hero />

      <Features />

      <div className="py-5"></div>
    </Container>
  );
}