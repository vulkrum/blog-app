import { useDispatch, useSelector } from "react-redux";
import { toggleVisibility } from "../reducers/visibilityReducer";
import { useState } from "react";
import { createBlog } from "../reducers/blogsReducer";
import {
  setNotification,
  timeoutNotification,
} from "../reducers/notificationReducer";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(toggleVisibility());
    const blog = { title, author, url };
    dispatch(createBlog(blog, user.username));
    document.getElementById("blog-form").reset();
    dispatch(
      setNotification({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        style: "success",
      })
    );
    dispatch(timeoutNotification());
  };

  return (
    <Box>
      <Typography variant="h5">create new</Typography>
      <form id="blog-form" onSubmit={handleSubmit}>
        <div>
          <FormLabel>title</FormLabel>
          <Input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <FormLabel>author</FormLabel>
          <Input
            type="text"
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <FormLabel>url</FormLabel>
          <Input
            type="text"
            name="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button sx={{ mt: "10px" }} variant="contained" type="submit">
          create
        </Button>
      </form>
    </Box>
  );
};

export default BlogForm;
