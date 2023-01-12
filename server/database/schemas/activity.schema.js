import { Schema } from "mongoose";

const activitySchema = new Schema({
  name: { type: String },
  time: { type: Date, default: Date.now },
});

export default activitySchema;
