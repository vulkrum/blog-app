const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => (acc += blog.likes), 0);
};

const favouriteBlog = blogs => {
  const favBlog = blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
  return { title: favBlog.title, author: favBlog.author, likes: favBlog.likes };
};

const mostBlogs = blogs => {
  const tally = {};
  blogs.forEach(blog => {
    if (tally.hasOwnProperty(`${blog.author}`)) {
      tally[blog.author] = ++tally[blog.author];
    } else {
      tally[blog.author] = 1;
    }
  });

  const maxAuthor = Object.keys(tally).reduce((a, b) =>
    tally[a] > tally[b] ? a : b
  );

  return { author: maxAuthor, blogs: tally[maxAuthor] };
};

const mostLikes = blogs => {
  const tally = {};
  blogs.forEach(blog => {
    if (tally.hasOwnProperty(`${blog.author}`)) {
      tally[blog.author] = tally[blog.author] + blog.likes;
    } else {
      tally[blog.author] = blog.likes;
    }
  });

  const maxAuthor = Object.keys(tally).reduce((a, b) =>
    tally[a] > tally[b] ? a : b
  );

  return { author: maxAuthor, likes: tally[maxAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
