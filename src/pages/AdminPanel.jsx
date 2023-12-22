import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  const scrollToTopRef = useRef(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const scrollToTop = () => {
    scrollToTopRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEditPost = (id) => {
    const postToEdit = posts.find(post => post.id === id);
    setTitle(postToEdit.title);
    setContent(postToEdit.body);
    setEditIndex(id);
    scrollToTop();
  };

  const handleCreatePost = () => {
    const newPost = { title, body: content };
    axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then(response => {
        setPosts([...posts, response.data]);
        setTitle('');
        setContent('');
        setStatusMsg('Post created successfully!');
        setTimeout(() => setStatusMsg(''), 3000);
      })
      .catch(error => {
        console.error('Error creating post:', error);
        setStatusMsg('Failed to create post');
      });
  };

  const handleUpdatePost = () => {
    const updatedPost = { title, body: content };
    axios.put(`https://jsonplaceholder.typicode.com/posts/${editIndex}`, updatedPost)
      .then(response => {
        const updatedPosts = posts.map(post =>
          post.id === editIndex ? { ...post, title, body: content } : post
        );
        setPosts(updatedPosts);
        setTitle('');
        setContent('');
        setEditIndex(null);
        setStatusMsg('Post updated successfully!');
        setTimeout(() => setStatusMsg(''), 3000);
      })
      .catch(error => {
        console.error('Error updating post:', error);
        setStatusMsg('Failed to update post');
      });
  };

  const handleDeletePost = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        setStatusMsg('Post deleted successfully!');
        setTimeout(() => setStatusMsg(''), 3000);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
        setStatusMsg('Failed to delete post');
      });
  };

  return (
    <Container>
      <div ref={scrollToTopRef} />
      <h1>Admin Panel</h1>
      <Form>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        {editIndex !== null ? (
          <Button variant="primary" className="mt-4" onClick={handleUpdatePost}>
            Update Post
          </Button>
        ) : (
          <Button variant="primary" className="mt-4" onClick={handleCreatePost}>
            Create Post
          </Button>
        )}
      </Form>
      <hr />
      <h2>Posts</h2>
      {statusMsg && <Alert variant="success">{statusMsg}</Alert>}
      {posts.map(post => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
            <Button variant="info" onClick={() => handleEditPost(post.id)}>
              Edit
            </Button>
            {' '}
            <Button variant="danger" className="ml-2" onClick={() => handleDeletePost(post.id)}>
              <FaTrash /> Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default AdminPanel;
