import express from "express";
import {
  getProperties,
  getFeatured,
  getPropertyById,
} from "../controllers/propertyController";

const router = express.Router();

router.get("/search", getProperties);
router.get("/:id", getPropertyById);
router.get("/", getFeatured);

export default router;
