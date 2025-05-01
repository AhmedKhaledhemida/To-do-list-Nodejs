import authRouter from "./Modules/Auth/auth.routes.js";
import tasksRouter from "./Modules/Tasks/task.routes.js";



export const bootstrap = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/tasks", tasksRouter);
 
};
