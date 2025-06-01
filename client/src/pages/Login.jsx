import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginSuccess } from "../redux/authSlice";

const Login = () => {
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors as user types
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) delete newErrors.email;
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

  const loginFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/login", formData);
      toast.success(data.message || "Login successful!", { position: "top-center" });
       localStorage.setItem('userId', data?.user.id)
      dispatch(loginSuccess())
     
      navigate('/')
      setFormData({ email: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", {
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
              <h2>Login Form</h2>
              <form onSubmit={loginFormSubmit}>
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

                <button type="submit">Login</button>
                <p className="loginLink-form">
                  Not registered? <Link to="/register">Register here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
