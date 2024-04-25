import { useDispatch, useSelector } from "react-redux";
import { toggleVisibility } from "../reducers/visibilityReducer";

import { Button, Box } from "@mui/material";

const Togglable = (props) => {
  const dispatch = useDispatch();
  const visibility = useSelector((state) => state.visibility);

  const hideWhenVisible = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" };

  return (
    <Box>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          id="show-btn"
          onClick={() => dispatch(toggleVisibility())}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="error"
          id="hide-btn"
          onClick={() => dispatch(toggleVisibility())}
        >
          cancel
        </Button>
      </div>
    </Box>
  );
};

Togglable.displayName = "Togglable";

export default Togglable;
