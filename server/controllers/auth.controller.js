import express from "express";
import { User } from "../database/models";
import sha256 from "sha256";
import { jwtConfig } from "../config";
import jwt from "jsonwebtoken";
import { authJwt } from "../middleware/auth.middleware";

const authController = express.Router();

authController.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userData = {
    name,
    email,
    password: sha256(password),
  };

  const user = await User.create(userData);

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, jwtConfig.jwtSecret, {
    expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 7,
  });

  user.activities.push({
    name: "login",
  });

  await user.save();

  return res.status(200).send({
    message: "register success",
    token,
  });
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({
      message: "Email Tidak ditemukan",
    });
  }

  if (user.password !== sha256(password)) {
    return res.status(400).send({
      message: "Password salah",
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, jwtConfig.jwtSecret, {
    expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 7,
  });

  user.activities.push({
    name: "login",
  });

  await user.save();

  return res.status(200).send({
    message: "login success",
    token,
  });
});

authController.post("/logout", authJwt, async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  user.activities.push({
    name: "logout",
  });

  await user.save();

  return res.status(200).send({
    message: "logout success",
  });
});

export default authController;
