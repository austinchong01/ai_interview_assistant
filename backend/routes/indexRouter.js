import express from "express";
import indexController from "../controllers/indexController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/form', upload.single("resume"), indexController.form);

export default router;