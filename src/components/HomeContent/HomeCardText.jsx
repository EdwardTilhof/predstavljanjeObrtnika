import Card from 'react-bootstrap/Card';

function TextCardStyle01({ text }) {
  return (
    <Card>
      <Card.Body>{text}</Card.Body>
    </Card>
  );
}

export default TextCardStyle01;