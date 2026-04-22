import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
function BlogDetails(){
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();

    function fetchBlogDetails() {
        fetch(`http://localhost:3000/blogs/${id}`)
            .then(response => response.json())
            .then(data => setBlog(data))
            .catch(error => console.error('Error fetching blog details:', error));
    }

    function handleDelete() {
        fetch(`http://localhost:3000/blogs/${id}`, {
            method: 'DELETE',
        }).then(() => {
          navigate('/');
        }).catch(error => console.error('Error deleting blog:', error));

    }

    function handleEdit(){
        navigate(`/blogs/${id}/edit`);
    }

    useEffect(() => {
        fetchBlogDetails();
    }, [id]);


    return(
        <div>
            {blog && (
                <div>
                    <h2>{blog.title}</h2>
                    <img src={blog.img} alt={blog.title} width={300} />
                    <p>{blog.body}</p>
                    <button onClick={handleEdit}>EditBlog</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default BlogDetails;