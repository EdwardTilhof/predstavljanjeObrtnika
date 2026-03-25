import { COMPANY_NAME } from "../constants";
import HomeCardStyle01 from "../components/HomeContent/HomeCard";
import { Col, Row } from "react-bootstrap";
import { CARD_DATA } from "../components/HomeContent/CardData";

export default function Home() {
  return (
    <>
    <div>
      <h1>Welcome to {COMPANY_NAME}</h1>
      <p>This is the home page.</p>
    </div>
    <Row className="Row-Card01">
        {CARD_DATA.map((item) => (
          <Col key={item.id} xs="auto" className="d-flex justify-content-center">
            <HomeCardStyle01 
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
    </>
  );

}
