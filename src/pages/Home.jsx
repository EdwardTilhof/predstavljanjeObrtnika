import { COMPANY_NAME } from "../constants";
import HomeCardStyle01 from "../components/HomeContent/HomeCard";
import { Col, Row } from "react-bootstrap";
import { CARD_DATA_HOME, TEXT_CARD_DATA_HOME } from "../components/HomeContent/CardData";


export default function Home() {
  return (
    <>
    <div>
      <h1>Welcome to {COMPANY_NAME}</h1>
      <p>{TEXT_CARD_DATA_HOME[0].text}</p>
    </div>
    <Row className="Row-Card01">
        {CARD_DATA_HOME.map((item) => (
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
