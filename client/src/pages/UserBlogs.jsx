import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogsCard from "../components/BlogsCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName , setUserName] = useState('Guest');

  const getUserBlogs = async () => {
    try {
      const userId = localStorage.getItem("userId"); // This is a string
     console.log(userId)
      const { data } = await axios.get(`http://localhost:5000/api/v1/user-blog/${userId}`);
      console.log(data)
      if (data?.success) {
        setBlogs(data?.userblog.blogs);
        console.log("id",data?.userblog.username);
        setUserName(data?.userblog.username);
      }
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
   
      {blogs && blogs?.length > 0 ? (
     blogs.map((blog, index) => (
    <div key={index}>
      <BlogsCard 
      blog={blog}
      username={userName}


      />
    </div>
  ))
) : (
  <h1 style={{ textAlign: 'center', color:'green', marginTop:'5px' }}>You haven't created any blog so far</h1>

)}

     
    </div>
  );
};

export default UserBlogs;
