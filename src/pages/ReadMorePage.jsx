import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const ReadMorePage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog post:', error);
      });

    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !commenterName.trim()) {
      return; // Prevent submitting empty comments or name
    }

    const commentData = {
      postId: parseInt(id),
      name: commenterName,
      body: newComment,
    };

    axios.post(`https://jsonplaceholder.typicode.com/comments`, commentData)
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
        setCommenterName('');
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 2000); // Hide status message after 2 seconds
      })
      .catch(error => {
        console.error('Error submitting comment:', error);
      });
  };

  return (
    <>
      {!loading ? (
        <Container className="pt-5">
          <h1>{blog.title}</h1>
          <Card>
            <Card.Body>
              <Card.Text>{blog.body}</Card.Text>
            </Card.Body>
          </Card>

          <h2 className="pt-4">Comments</h2>
          {comments.map(comment => (
            <Card key={comment.id} className="mb-3">
              <Card.Body>
                <Card.Title>{comment.name}</Card.Title>
                <Card.Text>{comment.body}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          <h3>Add a Comment</h3>
          {showStatus && (
            <Alert variant="success" className="mb-3">
              Your comment has been posted successfully!
            </Alert>
          )}
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group controlId="nameForm">
              <Form.Control
                type="text"
                placeholder="Your Name"
                value={commenterName}
                onChange={(e) => setCommenterName(e.target.value)}
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="commentForm">
              <Form.Control
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      ) : (
        <div className="container pt-5">
          <h2>Loading..</h2>
        </div>
      )}
    </>
  );
};

export default ReadMorePage;
