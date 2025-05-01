import { Router } from "express";
import {
  changePassword,
  changeUserdata,
  Signin,
  Signup,
  viewUserData,
} from "./auth.controller.js";
import {
  checkEmail,
  protectedRoutes,
} from "../../Middlewares/authentication.js";

const authRouter = Router();
authRouter.post("/signup", checkEmail, Signup);
authRouter.post("/signin", Signin);
authRouter.put(
  "/changepassword",
  protectedRoutes,

  changePassword
);
authRouter.put("/changeuserdata", protectedRoutes, changeUserdata);
authRouter.get("/view", protectedRoutes, viewUserData);
export default authRouter;
