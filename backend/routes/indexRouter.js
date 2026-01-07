import express from "express";
import indexController from "../controllers/indexController.js";

const router = express.Router();

router.post('/form', indexController.form);

export default router;