import { useDispatch } from "react-redux";
import { commentBlog } from "../reducers/blogsReducer";

import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog, e.target.comment.value));
    e.target.comment.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" name="comment" />
      <Button type="submit">add comment</Button>
    </form>
  );
};

export default CommentForm;
