import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import visibilityReducer from "./reducers/visibilityReducer";
import usersReducer from "./reducers/usersReducer";

import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
    notification: notificationReducer,
    visibility: visibilityReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
