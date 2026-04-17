import OurProjectCardStyle01 from "../../components/services/OurProjects/OurProjectCard";
import { Col, Container, Row } from "react-bootstrap";
import { PROJECT_CARD_DATA } from "../../../dataRepository/serviceData/ProjectCardData";
import { createUniqueId } from "../../../dataRepository/UUIDGenerator";


const newProjectId = createUniqueId('ourprojectscard');

console.log(newProjectId); // oPCard_...

export default function OurProjectsMain() {
  return (
    <Container>
      <Row className="Row-Card01">
        {PROJECT_CARD_DATA.map((item) => {
          console.log("Rendering Card ID:", item.id);

          return (
            <Col key={item.id} xs={12} md={6} lg={4} 
            className="d-flex justify-content-center mb-4">
              <OurProjectCardStyle01
                title={item.title}
                text={item.text}
                location={item.location}
                date={item.date}
                investment={item.investment}
                image={item.image}
                link={`/ourProjects/gallery/${item.id}`}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}