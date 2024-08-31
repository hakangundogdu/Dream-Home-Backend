import express from "express";
import {
  getProperties,
  getProperty,
  getFeatured,
} from "../controllers/propertyController";

const router = express.Router();

router.get("/:county/:status/:sort", getProperties);
router.get("/featured", getFeatured);
router.get("/:id", getProperty);

export default router;
