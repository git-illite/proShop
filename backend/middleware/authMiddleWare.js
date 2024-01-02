import Jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  //let rheader = req.headers.authorization;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    //console.log('token found');
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password')

      next();
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No token");
  }
  //next()
});

export { protect };
