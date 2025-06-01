import axios from "axios";
import React, { useState } from "react";
import {ToastContainer, toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

const CreateBlogs = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.imageUrl.trim()) newErrors.imageUrl = "Image URL is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const userId = localStorage.getItem("userId"); // Optional if your backend expects this
      const payload = { ...formData, user: userId };

      const { data } = await axios.post("http://localhost:5000/api/v1/create-blog", payload);

      if (data?.success) {
          toast.success(data.message || "Blog Created successful!", { position: "top-center" });
       navigate('/my-blogs')
          setFormData({ title: "", description: "", imageUrl: "" }); // Reset form
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog. Try again.");
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="create-blog-wrapper">
      <section className="create-blog-section">
        <div className="create-blog-container">
          <h2>Create Blog</h2>
          <form className="create-blog-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <span className="error">{errors.title}</span>}

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span className="error">{errors.description}</span>}

            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}

            <button type="submit">Create Blog</button>
          </form>
        </div>
      </section>
    </div>
    </>
  );
};

export default CreateBlogs;
