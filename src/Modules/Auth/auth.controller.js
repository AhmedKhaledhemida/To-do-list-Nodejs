import { User } from "../../../Database/Models/users.model.js";
import { catchError } from "../../Utils/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../../Utils/appError.js";
const Signup = catchError(async (req, res) => {
  let user = new User(req.body);
  await user.save();
  let token = jwt.sign(
    { userId: user._id, name: user.name, role: user.role },
    process.env.JWT_KEY
  );
  res.status(200).json({ message: "Suscess", data: token });
});

const Signin = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userId: user._id, name: user.name, role: user.role },
      process.env.JWT_KEY
    );
    return res.status(200).json({ message: "Suscess", data: token });
  }

  return next(new AppError("Incorrect Email or Password", 401));
});

const changePassword = catchError(async (req, res, next) => {
  let user = await User.findById(req.user._id);
  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
    await User.findByIdAndUpdate(req.user._id, {
      password: req.body.newPassword,
      passwordChangedAt: Date.now(),
    });
    let token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_KEY
    );
    return res.status(200).json({ message: "success", data: token });
  }
  next(new AppError("Incorrect old password", 401));
});
const changeUserdata = catchError(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );
  return res.status(200).json({ message: "success", data: user });
});

const viewUserData = catchError(async (req, res, next) => {
  let user = await User.findById(req.user._id).select("phone email name ");
  return res.status(200).json({ message: "success", data: user });
});

export { Signup, Signin, changePassword, changeUserdata, viewUserData };
