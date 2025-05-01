import { Router } from "express";
import {
  addtask,
  changeStatus,
  deleteTask,
  getALLTasks,
  getSingleTask,
  updateTask,
} from "./task.controller.js";
import { protectedRoutes } from "../../Middlewares/authentication.js";

const tasksRouter = Router();
tasksRouter.use(protectedRoutes);
tasksRouter.route("/").post(addtask).get(getALLTasks);
tasksRouter.route("/:id").get(getSingleTask).put(updateTask).delete(deleteTask)
tasksRouter.route("/changestauts/:id").put(changeStatus);
export default tasksRouter;
