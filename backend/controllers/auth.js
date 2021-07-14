const User = require("../models/User");

//Login
//POST /auth/login
//public
exports.login = async (req, res, next) => {
  const { name, password } = req.body;

  //Validate name & password
  if (!name || !password) {
    return res.status(400).send({
      success: false,
      msg: "Please provide Name & Password!",
    });
  }

  //Check if the user exists
  const user = await User.findOne({ name });
  if (!user) {
    return res.status(401).send({
      success: false,
      msg: "Invalid Credentials, Please provide the Right Name & Password!",
    });
  }
  res.status(200).send({
    success: true,
    data: user,
  });

  //Check if the password matches the one in the DB
  if (password !== user.password) {
    return res.status(401).send({
      success: false,
      msg: "Invalid Credentials, the Provided Password Doesn't Match the One you've registered with!",
      token,
    });
  }
};

//Get Current Loggedin User
//GET /auth/user
//private
exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).send({
    success: true,
    data: user,
  });
};
