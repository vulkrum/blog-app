import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { likeBlog } from "../reducers/blogsReducer";

import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const BlogView = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  return blog ? (
    <Box>
      <Typography>
        <Typography variant="h3" sx={{ mb: "48px" }}>
          {blog.title}
        </Typography>
        <Box sx={{ mb: "16px" }}>
          <Link href={blog.url}>{blog.url}</Link>
        </Box>
        <Typography sx={{ mb: "16px" }}>
          {blog.likes} likes{" "}
          <Button variant="contained" onClick={() => dispatch(likeBlog(blog))}>
            like
          </Button>
        </Typography>
        <Typography>Added by {blog.user.name}</Typography>
        <Typography variant="h5" sx={{ mt: "48px", mb: "16px" }}>
          Comments
        </Typography>
        <CommentForm blog={blog} />
        <CommentList blog={blog} />
      </Typography>
    </Box>
  ) : null;
};

export default BlogView;
