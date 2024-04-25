import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const CommentList = ({ blog }) => {
  const generateId = () => Math.floor(Math.random() * 1000000);

  return (
    <List>
      {blog.comments.map((comment) => (
        <ListItem key={`${blog.id}_${generateId()}`}>{comment}</ListItem>
      ))}
    </List>
  );
};

export default CommentList;
