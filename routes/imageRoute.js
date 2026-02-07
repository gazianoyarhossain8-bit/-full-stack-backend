import express from "express";
import { upload } from "../middleware/upload.js";

const imageStorage = express.Router();

imageStorage.post("/upload", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  res.json({
    msg: "File uploaded successfully",
    file: req.file
  });
});

export default imageStorage;