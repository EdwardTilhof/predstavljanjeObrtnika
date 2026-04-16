import OurProjectCardStyle01 from "../../components/services/OurProjects/OurProjectCard";
import { Col, Container, Row } from "react-bootstrap";
import { PROJECT_CARD_DATA } from "../../components/services/OurProjects/CardData";



export default function OurProjectsMain() {
  return (
    <Container>
      <Row className="Row-Card01">
        {PROJECT_CARD_DATA.map((item) => (
<Col key={item.id} xs={12} md={6} lg={4} className="d-flex justify-content-center mb-4">            <OurProjectCardStyle01 
              title={item.title}
              text={item.text}
              location={item.location}
              date={item.date}
              investment={item.investment}
              image={item.image}
              link={item.link}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}