import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import { authController } from "./controllers";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

mongoose.connect("mongodb://localhost/test").then(() => {
  console.log(`Conneted to mongoDB at port 27017`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

app.use("/auth", authController);

// Start Server here
app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});
