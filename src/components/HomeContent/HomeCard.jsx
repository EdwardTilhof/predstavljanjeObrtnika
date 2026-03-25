import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function HomeCardStyle01({ title, text, location, date, investment, image, link }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image || "https://placehold.co/100x120"} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Location: {location}</ListGroup.Item>
        <ListGroup.Item>Date: {date}</ListGroup.Item>
        <ListGroup.Item>Investment: {investment} EUR</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href={link}>Project gallery</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default HomeCardStyle01;