import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getPosts } from '../api/api';
import BlogCard from '../components/BlogCard';

function Home() {
    const [blog, setBlog] = useState([])
    const [loading, setLoading]  = useState(true)
    useEffect(()=>{
    const data = async ()=>{
        try {

            const posts = await getPosts();
            console.log('Posts:', posts);
            setBlog(posts)
            setLoading(false)
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
    }
    data()
    }, [])
  return (
   <>
   <div className="container">
    <h1 className='title-heading'>My blogs</h1>
   { !loading ?
     <div className="row">
     {
         blog.map((item, index)=>{
             return(
                <div className="col-md-6 col-lg-4 col-xl-3 mb-3" key={index}>
                  <BlogCard myBlog={item} />
                </div>
             )
         })
     }
         </div> : <h2>Loading...</h2>
   }
   </div>
   </>
  )
}

export default Home