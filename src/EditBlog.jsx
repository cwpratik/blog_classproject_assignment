import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState("");
 
  useEffect(() => {
    fetch(`http://localhost:3000/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setBody(data.body);
        setImg(data.img);
        setAuthor(data.author);
      });
  }, [id]);
 
  function handleUpdate(e) {
    e.preventDefault();
 
    const updatedBlog = { title, body, img, author };
 
    fetch(`http://localhost:3000/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBlog),
    }).then(() => {
      navigate(`/blogs/${id}`);
    });
  }
 
  return (
    <div className="create">
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input value={img} onChange={(e) => setImg(e.target.value)} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button>Update Blog</button>
      </form>
    </div>
  );
}
 
export default EditBlog;