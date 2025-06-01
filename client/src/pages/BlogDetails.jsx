import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
console.log("idfromparams", id)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  // Fetch blog details on load
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/getDetailBlog/${id}`);
        if (data?.success) {
          setFormData({
            title: data.detailBlog.title,
            description: data.detailBlog.description,
            imageUrl: data.detailBlog.imageUrl,
          });
        } else {
          toast.error('Blog not found');
        }
      } catch (error) {
        toast.error('Error fetching blog details');
        console.error(error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const payload = { ...formData, user: userId };
      const { data } = await axios.put(`http://localhost:5000/api/v1/update-blog/${id}`, payload);

      if (data?.success) {
        toast.success("Blog updated successfully!");
        setTimeout(() => navigate("/blogs"), 1500); // navigate after delay
      } else {
        toast.error(data.message || "Failed to update blog");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="create-blog-wrapper">
        <section className="create-blog-section">
          <div className="create-blog-container">
            <h2>Update Blog</h2>
            <form className="create-blog-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />

              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
              />

              <button type="submit">Update Blog</button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogDetails;
