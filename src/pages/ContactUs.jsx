import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import ForumMessage from '../components/ContactUs/ForumMessage';
import { MOCK_FORUM_POSTS } from '../components/ContactUs/ConstantsContact';

export default function ContactUs() {
  const [posts, setPosts] = useState(MOCK_FORUM_POSTS);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newEntry = {
      id: posts.length + 1,
      user: "Guest User", /*in real it should be a user with log in information*/
      date: new Date().toLocaleDateString(),
      text: newMessage,
      adminReply: null,
      status: "pending"
    };

    setPosts([newEntry, ...posts]);
    setNewMessage("");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h2 className="text-center mb-4">Questions and answers</h2>

          <Card className="mb-5 shadow-sm p-4 border-top border-4 custom-card-contact-us">
            <h5>Leave a public message</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ask a question or leave a comment..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </Form.Group>
              <Button
                type="submit"
                className="btn-theme-solid mt-3 px-5 shadow-none"
              >
                Post Message
              </Button>            </Form>
          </Card>

          <div className="forum-list">
            {posts.map(post => (
              <ForumMessage key={post.id} post={post} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}