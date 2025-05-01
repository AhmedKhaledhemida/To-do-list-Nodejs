import { Tasks } from "../../../Database/Models/tasks.model.js";
import { ApiFeature } from "../../Utils/ApiFeatures.js";
import { AppError } from "../../Utils/appError.js";
import { catchError } from "../../Utils/catchError.js";

const addtask = catchError(async (req, res) => {
  req.body.user = req.user._id;
  let task = new Tasks(req.body);
  await task.save();
  res.status(200).json({ message: "Success", data: task });
});
const getALLTasks = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeature(
    Tasks.find({ user: req.user._id }),
    req.query
  )

    .sort()
    .filter()
    .search();
  let document = await apiFeatures.mongooseQuery;
  if (document.length === 0)
    return next(new AppError("There are no tasks.", 404));
  res.status(200).json({
    message: "success",

    data: document,
  });
});

const getSingleTask = catchError(async (req, res, next) => {
  let task = await Tasks.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return next(new AppError("Task not found", 404));
  res.status(200).json({ message: "Success", data: task });
});

const updateTask = catchError(async (req, res, next) => {
  let task = await Tasks.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    {
      new: true,
    }
  );
  if (!task) return next(new AppError("Task not found", 404));
  res.status(200).json({ message: "Success", data: task });
});

const deleteTask = catchError(async (req, res, next) => {
  let task = await Tasks.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!task) return next(new AppError("Task not found", 404));
  res.status(200).json({ message: "Success", data: task });
});

const changeStatus = catchError(async (req, res, next) => {
  const task = await Tasks.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) return next(new AppError("Task not found", 404));

  // Toggle the status

  task.status = task.status === "Pending" ? "Complete" : "Pending";

  await task.save();

  res.status(200).json({ message: "Success", data: task });
});

export {
  addtask,
  getALLTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  changeStatus,
};
