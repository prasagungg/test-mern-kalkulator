import { Schema } from "mongoose";
import activitySchema from "./activity.schema";

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  activities: [activitySchema],
});

export default userSchema;
