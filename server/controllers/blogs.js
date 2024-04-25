const blogsRouter = require('express').Router();
const blog = require('../models/blog');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user');
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const users = await User.find({});

  if (!users.length) {
    return res.status(400).end();
  }

  if (!req.body.title || !req.body.url) {
    return res.status(400).end();
  }

  const user = req.user;

  const blog = new Blog({
    ...req.body,
    likes: req.body.likes ? req.body.likes : 0,
    comments: req.body.comments ? req.body.comments : [],
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const user = req.user;

  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(req.params.id);
    user.blogs = user.blogs.filter(b => b._id.toString() !== req.params.id);
    await user.save();
    res.status(204).end();
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  res.status(200).json(updatedBlog);
});

blogsRouter.put('/:id/comments', async (req, res) => {
  if (!req.body) {
    return res.status(400).end();
  }

  const updatedBlog = await Blog.findById(req.params.id);
  updatedBlog.comments.push(req.body.comment);
  await updatedBlog.save();
  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
