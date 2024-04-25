import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const User = () => {
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const userMatch = useMatch("/users/:id");
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  if (!user) return null;

  return user ? (
    <Box>
      <Typography variant="h2">{user.name}</Typography>
      <Typography variant="h3">Added blogs</Typography>
      <List>
        {blogs
          .filter((blog) => blog.user.username === user.username)
          .map((blog) => (
            <ListItem key={blog.id}>
              <Typography>{blog.title}</Typography>
            </ListItem>
          ))}
      </List>
    </Box>
  ) : null;
};

export default User;
