import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/userReducer";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1, mb: "50px" }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Box>
            <Typography>
              <Link
                sx={{ color: "white", mr: "50px" }}
                component={RouterLink}
                to="/"
              >
                Blogs
              </Link>
              <Link sx={{ color: "white" }} component={RouterLink} to="/users">
                Users
              </Link>
            </Typography>
          </Box>
          <Box sx={{ ml: "600px" }}>
            <Typography sx={{ display: "inline", fontWeight: "medium" }}>
              {user.name} is logged in
            </Typography>{" "}
            <Button onClick={handleLogout}>
              <LogoutIcon sx={{ color: "white" }} />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
