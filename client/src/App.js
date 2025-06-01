import Blogs from "./pages/Blogs";
import UserBlogs from "./pages/UserBlogs";

import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import CreateBlogs from "./pages/CreateBlogs";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Blogs/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/my-blogs' element={<UserBlogs/>}/>
      <Route path='/blog-details/:id' element={<BlogDetails/>}/>
      <Route path='/create-blogs' element={<CreateBlogs/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </>
  );
}

export default App;