import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";

const getOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    document || next(new AppError(("document not found", 404)));
    !document || res.status(200).json({ message: "success", document });
  });
};

const getAll = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.find();
    if (document.length === 0)
      return next(new AppError("document not found", 404));
    res.status(200).json({ message: "success", document });
  });
};

const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    if (document.length === 0)
      return next(new AppError("document not found", 404));
    return res.status(200).json({ message: "Success", document });
  });
};

export { getAll, getOne, deleteOne };
