import { AppError } from "./appError.js";

export const validations = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(
      { ...req.body, ...req.params, ...req.query },
      { abortEarly: true }
    );
    if (!error) {
      next();
    } else {
      next(new AppError(error.details[0].message, 401));
    }
  };
};
