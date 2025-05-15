import BlogsCard from "../components/BlogsCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/allblogs");
      console.log(data?.allbogs)
      if (data?.allbogs) {

        setBlogs(data.allbogs);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      {blogs?.map((blog, index) => (
        <div key={index}>
          <BlogsCard blog={blog} />
        </div>
      ))}
    </>
  );
};

export default Blogs;
