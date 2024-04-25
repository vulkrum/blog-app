import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { likeBlog, deleteBlog } from "../reducers/blogsReducer";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionActions from "@mui/material/AccordionActions";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const confirmDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id));
    }
    return;
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="fontWeightMedium">{blog.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Link target="_blank" href={blog.url} to={blog.url}>
              {blog.url}
            </Link>
          </Typography>
          <Typography>Author: {blog.author}</Typography>
          <Typography>Likes: {blog.likes}</Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => dispatch(likeBlog(blog))}
          >
            like
          </Button>

          <Button
            component={RouterLink}
            variant="contained"
            to={`/blogs/${blog.id}`}
          >
            view more
          </Button>
          {user.username === blog.user.username && (
            <Button
              component={Link}
              variant="contained"
              color="error"
              onClick={() => confirmDelete(blog)}
            >
              delete
            </Button>
          )}
        </AccordionActions>
      </Accordion>
    </>
  );
};

export default Blog;
