import express from "express";
import { getProperties, getFeatured } from "../controllers/propertyController";

const router = express.Router();

/* router.get("/:county/:status/:sort", getProperties);
router.get("/featured", getFeatured);
router.get("/:id", getProperty); */
router.get("/:city/:status", getProperties);
router.get("/", getFeatured);
export default router;
