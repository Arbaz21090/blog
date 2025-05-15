import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

// import { styled } from "@mui/material/styles";

// Main Blog Card Component
export default function BlogsCard({ blog }) {


  return (
    <Card sx={{ maxWidth: 545, margin: "16px auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="blog">
            {blog.user?.username?.charAt(0).toUpperCase() || "B"}
          </Avatar>
        }
      
        title={blog.title}
        subheader={blog.createdAt || new Date().toDateString()}
      />

      {blog.imageUrl && (
        <CardMedia
          component="img"
          height="194"
          image={blog.imageUrl}
          alt={blog.title}
        />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {blog.description?.length > 120
            ? blog.description.substring(0, 120) + "..."
            : blog.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
    
      </CardActions>

     
    </Card>
  );
}
