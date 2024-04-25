const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

const api = supertest(app);

test('all blogs are returned as json', async () => {
  const res = await api.get('/api/blogs');
  expect(res.statusCode).toBe(200);
  expect(res.type).toMatch(/application\/json/);
  expect(res.body).toHaveLength(helper.initialBlogs.length);
});

test('all blogs contain "id" property', async () => {
  const blogs = await helper.blogsInDb();
  blogs.forEach(blog => expect(blog.id).toBeDefined());
});

test('add blog and check if in db', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://archlinux.org',
    likes: 99,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const blogCheck = blogsAtEnd.map(blog => {
    const blogCopy = Object.assign(blog);
    delete blogCopy.id;
    return blogCopy;
  });
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogCheck).toContainEqual(newBlog);
});

test('set likes to new blog if property is missing', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://archlinux.org',
  };

  await api.post('/api/blogs').send(newBlog);
  const blogsAtEnd = await helper.blogsInDb();
  const addedBlog = await blogsAtEnd.find(blog => blog.title === 'Test Blog');
  expect(addedBlog.likes).toBe(0);
});

test('return 400 if title or url is missing', async () => {
  const newBlog = {
    author: 'Test Author',
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

test('deletion of a blog', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map(blog => blog.title);

  expect(titles).not.toContain(blogToDelete.title);
});

test('update of a blog', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  blogToUpdate.likes = 1000;

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200);

  const blogsAtEnd = await helper.blogsInDb();

  const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);

  expect(updatedBlog.likes).toBe(blogToUpdate.likes);
});
