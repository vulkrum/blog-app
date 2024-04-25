import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { initialiseUser } from "./reducers/userReducer";
import { initialiseUsers } from "./reducers/usersReducer";
import { initialiseBlogs } from "./reducers/blogsReducer";
import { clearNotification } from "./reducers/notificationReducer";

import Nav from "./components/Nav";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import BlogPage from "./components/BlogPage";
import UserList from "./components/UserList";
import UserPage from "./components/UserPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearNotification());
    dispatch(initialiseUser());
    dispatch(initialiseUsers());
    dispatch(initialiseBlogs());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  return user ? (
    <div>
      <Nav />
      <Notification />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
      </Routes>
    </div>
  ) : (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default App;
