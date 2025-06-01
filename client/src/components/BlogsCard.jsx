import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import axios from "axios";

import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
// import { styled } from "@mui/material/styles";

// Main Blog Card Component
export default function BlogsCard({ blog, username }) {
  const currentUserId = localStorage.getItem("userId");
  const blogUser = blog?.user;
  const blogId=blog._id
  const blogUsername = blogUser?.username || username || "No User";
  const blogUserInitial = blogUsername.charAt(0).toUpperCase();
 console.log("blogsuser", blogUser)
 console.log("blogid",blog._id)
const navigate=useNavigate()
const handleEdit=()=>{
  navigate(`/blog-details/${blogId}`)
}
const handleDelete = async () => {
  try {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    const { data } = await axios.delete(`http://localhost:5000/api/v1/delete-blog/${blogId}`);

    if (data?.success) {
      toast.success("Blog deleted successfully!");
      setTimeout(() => {
        navigate("/blogs"); // redirect after deletion
      }, 1500);
    } else {
      toast.error(data.message || "Failed to delete blog");
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    toast.error("Something went wrong. Try again.");
  }
};
 
  return (
    <Card sx={{ maxWidth: 545, margin: "16px auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="blog">
            {blogUserInitial}
          </Avatar>
        }
        action={
          currentUserId === blogUser && (
            <>
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          )
        }
        title={blog.title}
        subheader={blog.createdDate || new Date().toDateString()}
      />

      {blog.imageUrl && (
       <CardMedia
  component="img"
  image={blog.imageUrl}
  alt={blog.title}
  sx={{
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'cover',
  }}
/>

      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {blog.description}
        </Typography>
      </CardContent>

      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
    
      </CardActions> */}
    </Card>
  );
}
