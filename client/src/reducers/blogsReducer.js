import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => state.concat(action.payload),
    updateBlog: (state, action) =>
      state.map((a) => (a.id === action.payload.id ? action.payload : a)),
    removeBlog: (state, action) => state.filter((a) => a.id !== action.payload),
    addComment: (state, action) => {
      state
        .find((a) => a.id === action.payload.id)
        .comments.push(action.payload.comment);
    },
  },
});

export const { setBlogs, addBlog, updateBlog, removeBlog, addComment } =
  blogsSlice.actions;

export const initialiseBlogs = () => {
  return async (dispatch) => {
    dispatch(setBlogs(await blogService.getAll()));
  };
};

export const createBlog = (blog, username) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog({ ...newBlog, user: { username } }));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update({
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }));
  };
};

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    await blogService.comment(blog.id, { comment });
    dispatch(addComment({ id: blog.id, comment }));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export default blogsSlice.reducer;
