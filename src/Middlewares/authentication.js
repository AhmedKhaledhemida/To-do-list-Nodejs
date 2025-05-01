import jwt from "jsonwebtoken";
import { AppError } from "../Utils/appError.js";
import { catchError } from "../Utils/catchError.js";
import { User } from "../../Database/Models/users.model.js";

const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  let userDataFromToken = null;
  if (!token) return next(new AppError("Token not provided", 401));

  jwt.verify(token, process.env.JWT_KEY, (err, data) => {
    if (err) return next(new AppError(err, 401));
    userDataFromToken = data;
  });

  let user = await User.findById(userDataFromToken.userId);
  if (!user) return next(new AppError("User not found", 404));
  if (user.passwordChangedAt && user.passwordChangedAt instanceof Date) {
    let time = parseInt(user.passwordChangedAt.getTime() / 1000);

    if (time > userDataFromToken.iat) {
      return next(new AppError("Invalid token ... login again", 401));
    }
  }
  req.user = user;
  next();
});

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (roles.includes(req.user.role)) return next();
    return next(
      new AppError("You are not authorized to access this end point", 401)
    );
  });
};
const checkEmail = catchError(async (req, res, next) => {
  let isExist = await User.findOne({ email: req.body.email });
  if (isExist) return next(new AppError("Email already exists", 400));
  next();
});
export { protectedRoutes, allowedTo, checkEmail };
