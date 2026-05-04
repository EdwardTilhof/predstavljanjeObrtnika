import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Spinner } from 'react-bootstrap';
import '../../colorsAndDesign/SiteColors';
import '../../colorsAndDesign/ColorsStyle.css';
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_PHONE,
    COMPANY_EMAIL,
    COMPANY_WORKING_HOURS,
    COMPANY_CID
} from '../../Constants';
import dataFacade from '../../services/dataFacade'; // Adjust the path if necessary

const ContactUs = () => {
    // Determine user roles from localStorage
    const currentUserRole = localStorage.getItem('user_role') || 'GUEST';
    const currentUserName = localStorage.getItem('user_name') || '';

    const isLoggedIn = currentUserRole !== 'GUEST';
    const canModerate = currentUserRole === 'ADMIN' || currentUserRole === 'MODERATOR';

    // Form states
    const [questionText, setQuestionText] = useState('');
    const [replyingToId, setReplyingToId] = useState(null);
    const [replyText, setReplyText] = useState('');

    // Data states
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch questions on component mount
    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            let fetchedQuestions = await dataFacade.getQuestions();

            // If there are no questions, inject the mock question for testing
            if (fetchedQuestions.length === 0) {
                const mockQuestion = {
                    id: Date.now().toString(),
                    author: 'JohnDoe',
                    text: 'Are you available for projects outside of Croatia?',
                    timestamp: new Date().toLocaleDateString(),
                    reply: 'Yes, we handle international projects as well. Please contact us via email for specifics!',
                    replyAuthor: 'Admin'
                };

                await dataFacade.addQuestion(mockQuestion);
                fetchedQuestions = [mockQuestion];
            }

            // Reverse so the newest questions appear at the top
            setQuestions(fetchedQuestions.reverse());
        } catch (error) {
            console.error("Failed to load questions", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAskQuestion = async (e) => {
        e.preventDefault();
        if (!questionText.trim()) return;

        const newQuestion = {
            author: currentUserName,
            text: questionText,
            timestamp: new Date().toLocaleDateString(),
            reply: null,
            replyAuthor: null
        };

        try {
            const savedQuestion = await dataFacade.addQuestion(newQuestion);
            setQuestions([savedQuestion, ...questions]); // Add to top of list
            setQuestionText('');
        } catch (error) {
            console.error("Failed to save question", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await dataFacade.deleteQuestion(id);
            setQuestions(questions.filter(q => q.id !== id));
        } catch (error) {
            console.error("Failed to delete question", error);
        }
    };

    const handleReplySubmit = async (id) => {
        if (!replyText.trim()) return;

        const questionToUpdate = questions.find(q => q.id === id);

        if (questionToUpdate) {
            const updatedQuestion = { ...questionToUpdate, reply: replyText, replyAuthor: currentUserName };

            try {
                await dataFacade.updateQuestion(id, updatedQuestion);
                setQuestions(questions.map(q => q.id === id ? updatedQuestion : q));
                setReplyingToId(null);
                setReplyText('');
            } catch (error) {
                console.error("Failed to save reply", error);
            }
        }
    };

    return (
        <div className="MainContainer py-5">
            <Container>

                {/* Header Section */}
                <div className="text-center mb-5">
                    <h1 className="dynamic-heading display-4 fw-bold">Community Q&A</h1>
                    <p className="dynamic-text fs-5">
                        Have a question about our services? Ask the community or browse existing answers below.
                    </p>
                </div>

                {/* Contact Information */}
                <Col lg={5}>
                    <div className="p-5 shadow-sm border custom-card h-100">
                        <h3 className="dynamic-heading mb-4 fw-bold">{COMPANY_NAME}</h3>

                        <div className="mb-4">
                            <h5 className="dynamic-heading fw-bold mb-1">📍 Location</h5>
                            <p className="fs-6 mb-0" style={{ color: 'var(--feature-text-muted)' }}>{COMPANY_ADDRESS}</p>
                        </div>

                        <div className="mb-4">
                            <h5 className="dynamic-heading fw-bold mb-1">📞 Phone</h5>
                            <p className="fs-6 mb-0" style={{ color: 'var(--feature-text-muted)' }}>{COMPANY_PHONE}</p>
                        </div>

                        <div className="mb-4">
                            <h5 className="dynamic-heading fw-bold mb-1">✉️ Email</h5>
                            <p className="fs-6 mb-0" style={{ color: 'var(--feature-text-muted)' }}>{COMPANY_EMAIL}</p>
                        </div>

                        <div className="mb-4">
                            <h5 className="dynamic-heading fw-bold mb-1">🕒 Business Hours</h5>
                            <p className="fs-6 mb-0" style={{ color: 'var(--feature-text-muted)' }}>
                                {COMPANY_WORKING_HOURS}<br />
                                Saturday - Sunday: Closed
                            </p>
                        </div>

                        <div className="mb-0">
                            <h5 className="dynamic-heading fw-bold mb-1">🏢 Company ID</h5>
                            <p className="fs-6 mb-0" style={{ color: 'var(--feature-text-muted)' }}>CID: {COMPANY_CID}</p>
                        </div>
                    </div>
                </Col>

                <Row className="g-4 mb-5">
                    {/* Contact/Question Form Column */}
                    <Col lg={7}>
                        <div className="p-5 shadow-sm border custom-card h-100">
                            <h3 className="dynamic-heading mb-4 fw-bold">Ask a Question</h3>

                            {isLoggedIn ? (
                                <Form onSubmit={handleAskQuestion}>
                                    <Form.Group className="mb-4" controlId="formMessage">
                                        <Form.Label className="dynamic-text fw-medium">
                                            Posting publicly as: <Badge bg="secondary">{currentUserName}</Badge>
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Write your question here..."
                                            value={questionText}
                                            onChange={(e) => setQuestionText(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="px-5 py-2 fw-bold shadow-sm" style={{ borderRadius: '25px' }}>
                                        Post Question
                                    </Button>
                                </Form>
                            ) : (
                                <div className="text-center py-4 --feature-card-bg rounded border">
                                    <p className="mb-0 dynamic-text fw-medium text-muted">Guests can view questions, but you must be logged in to ask one.</p>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>

                {/* Forum / Q&A Display Section */}
                <Row>
                    <Col lg={12}>
                        <h3 className="dynamic-heading mb-4 fw-bold border-bottom pb-2">Recent Questions</h3>

                        {loading ? (
                            <div className="text-center py-5">
                                <Spinner animation="border" variant="primary" />
                                <p className="mt-2 text-muted">Loading questions...</p>
                            </div>
                        ) : questions.length === 0 ? (
                            <p className="text-muted">No questions have been asked yet. Be the first!</p>
                        ) : (
                            questions.map((q) => (
                                <Card key={q.id} className="mb-3 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="fw-bold fs-5 text-primary">
                                                <i className="bi bi-person-circle me-2"></i>{q.author}
                                                <span className="text-muted fs-6 ms-2 fw-normal">{q.timestamp}</span>
                                            </div>

                                            {(canModerate || currentUserName === q.author) && (
                                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(q.id)}>
                                                    Delete
                                                </Button>
                                            )}
                                        </div>
                                        <Card.Text className="fs-5">{q.text}</Card.Text>

                                        {q.reply ? (
                                            <div className="mt-3 p-3 --feature-card-bg rounded border-top border-bottom border-4 border-success">
                                                <strong className="text-success"><i className="bi bi-shield-check me-1"></i> {q.replyAuthor} (Staff):</strong>
                                                <p className="mb-0 mt-1">{q.reply}</p>
                                            </div>
                                        ) : (
                                            canModerate && (
                                                <div className="mt-3 pt-3 border-top">
                                                    {replyingToId === q.id ? (
                                                        <Form>
                                                            <Form.Control
                                                                as="textarea"
                                                                rows={2}
                                                                placeholder="Write your answer..."
                                                                value={replyText}
                                                                onChange={(e) => setReplyText(e.target.value)}
                                                                className="mb-2"
                                                            />
                                                            <Button variant="success" size="sm" onClick={() => handleReplySubmit(q.id)} className="me-2">Submit Reply</Button>
                                                            <Button variant="secondary" size="sm" onClick={() => setReplyingToId(null)}>Cancel</Button>
                                                        </Form>
                                                    ) : (
                                                        <Button variant="outline-success" size="sm" onClick={() => setReplyingToId(q.id)}>
                                                            <i className="bi bi-reply"></i> Answer Question
                                                        </Button>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ContactUs;