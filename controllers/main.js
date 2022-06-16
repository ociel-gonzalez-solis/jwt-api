const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const postLogin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide a valid username and password");
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // console.log(username, password);

  res.status(200).json({
    msg: `User created`,
    token: token,
  });
};

const getDashboard = async (req, res, next) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  postLogin,
  getDashboard,
};
