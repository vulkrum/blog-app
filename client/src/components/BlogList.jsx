import { useState } from "react";
import { useSelector } from "react-redux";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const BlogList = () => {
  const [sort, setSort] = useState(false);
  const blogs = useSelector((state) => state.blogs);

  return (
    <Box>
      <Typography sx={{ mb: "10px" }} variant="h3">
        Blogs
      </Typography>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>

      <br></br>

      <Box>
        <Button
          sx={{ mb: "10px" }}
          variant="contained"
          id="sort-btn"
          onClick={() => setSort(!sort)}
        >
          {sort ? "sort by added" : "sort by likes"}
        </Button>
        <Box id="blog-list">
          {(sort ? blogs.toSorted((a, b) => b.likes - a.likes) : blogs).map(
            (blog) => (
              <Blog key={blog.id} blog={blog} />
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BlogList;
