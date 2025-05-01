import { model, Schema, Types } from "mongoose";
import { User } from "./users.model.js";

const schema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["Complete", "Pending"],
      default: "Pending",
    },
    duedate: {
      type: Date,
      require: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: true }
);

export const Tasks = model("Tasks", schema);
