const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Protect Routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //check if the token exists
  if (!token) {
    return res.status(401).send({
      success: false,
      msg: "SORRY, But You Are Not Authorized to Access this Route!",
    });
  }

  //TOKEN==> {id:xxx, iat:xxx, expiration:xxx}
  try {
    //extract the payload
    const decoded = jwt.verify(token, "secret");

    console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      msg: "SORRY, But You Are Not Authorized to Access this Route!",
    });
  }
};
