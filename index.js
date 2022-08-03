import express from "express";
import mongoose from 'mongoose';
import multer from "multer"
import cors from "cors";

import { regValidation } from './validations/auth.js';
import { postCreateValidation } from "./validations/post.js";
import checkAuth from './utils/checkAuth.js';
import { register, login, getMe } from './controllers/UserController.js'
import { create, getAll, getOne, remove, update } from './controllers/PostController.js';
import handleValidationErrors from './utils/handleValidationErrors.js'


mongoose.connect(
  'mongodb+srv://Kayfoon:Sultanoff@cluster0.zoejw.mongodb.net/data?retryWrites=true&w=majority',)
  .then(() => {console.log("ok")})
  .catch((err) => console.log("DB error", err))

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({ storage });



app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"))

app.post("/auth/login", handleValidationErrors, login);
app.post("/auth/reg", regValidation, handleValidationErrors,  register);
app.post("/uploads", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
});

app.get("/posts", getAll);
app.get("/auth/me", checkAuth, getMe);
app.post("/posts", checkAuth, postCreateValidation,  handleValidationErrors, create);
app.get("/posts/:id", getOne);
app.delete("/posts/:id", checkAuth, remove)
app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, update)

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  };

  console.log("Working!");
});