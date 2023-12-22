import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function BlogCard(props) {
    const receivedObject = props.myBlog
    const history = useNavigate();

  return (
    <Card style={{ width: '100%' , height: '100%'}}>
      <Card.Body>
        <Card.Title>{receivedObject?.title}</Card.Title>
        <Card.Text className='description'>
         {receivedObject?.body}
        </Card.Text>
        <Button variant="primary" onClick={()=>{
             history(`/blog/${receivedObject?.id}`);
        }}>Learn more</Button>
      </Card.Body>
    </Card>
  );
}

export default BlogCard;