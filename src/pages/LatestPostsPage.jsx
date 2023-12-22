import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';

const LatestPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching latest posts:', error);
      });
  }, []);

  return (
    <Container className="pt-5">
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Latest Posts</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {posts.map(post => (
            <Card key={post.id} className="mb-3" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>{post.title}</Card.Title>
                <Card.Text style={{ fontSize: '1.1rem', color: '#444' }}>{post.body}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default LatestPostsPage;
