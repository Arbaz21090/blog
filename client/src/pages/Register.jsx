import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate=useNavigate();
  
  const [formData, setFormData] = useState({
    username:"",        // 👈 Convert 'name' to 'username'
      email:"",
     password:"",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (name === "name" && value.trim().length >= 2) {
        delete newErrors.name;
      }

      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
          delete newErrors.email;
        }
      }

      if (name === "password" && value.length >= 6) {
        delete newErrors.password;
      }

      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) {
      newErrors.username = "username is required";
    } else if (formData.username.trim().length < 2) {
      newErrors.username = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const registerFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // 👇 Replace with your actual backend API URL
      const {data} = await axios.post("http://localhost:5000/api/v1/create-user", formData);
      toast.success(data.message, { position: "top-center" });
      navigate('/login')
      setFormData({ username: "", email: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="login-section">
        <div className="login-container">
          <div className="image-column">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              alt="Beautiful Landscape"
              className="login-image"
            />
          </div>
          <div className="form-column">
            <div className="login-form">
              <h2>Registration Form</h2>
              <form onSubmit={registerFormSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Name"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <small style={{ color: "red", display: "block", marginTop: "4px" }}>
                      {errors.name}
                    </small>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <small style={{ color: "red", display: "block", marginTop: "4px" }}>
                      {errors.email}
                    </small>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <small style={{ color: "red", display: "block", marginTop: "4px" }}>
                      {errors.password}
                    </small>
                  )}
                </div>

                <button type="submit">Register</button>
                <p className="loginLink-form">
                  Already registered? <Link to="/login">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
