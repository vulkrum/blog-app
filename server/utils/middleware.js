const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userExtractor = async (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(404).json({ error: "token invalid" });
    }

    req.user = await User.findById(decodedToken.id);
    next();
  } else {
    next();
  }
};

module.exports = { userExtractor };
