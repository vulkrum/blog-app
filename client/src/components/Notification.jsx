import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  return <Alert severity={notification.style}>{notification.message}</Alert>;
};

export default Notification;
