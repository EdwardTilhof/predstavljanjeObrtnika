import { Container, Row, Col } from "react-bootstrap";
import { useDataSource } from "../DataSource/DataSourceContext";
import { UserInfoCard } from "../UserData/UserProfile/UserProfileComponents";

export default function UserProfileMain() {
  // Pull the logged-in user from your DataSourceContext
  const { currentUser } = useDataSource();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          {/* Pass the global user data into your component */}
          <UserInfoCard user={currentUser} />
        </Col>
      </Row>
    </Container>
  );
}