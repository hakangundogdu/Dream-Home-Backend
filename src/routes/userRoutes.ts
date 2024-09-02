import express from "express";
import {
  getSavedProperties,
  saveProperty,
  deleteSavedProperty,
} from "../controllers/userController";

const router = express.Router();

router.get("/saved/:uid", getSavedProperties);
router.post("/saved", saveProperty);
router.delete("/saved", deleteSavedProperty);

export default router;
