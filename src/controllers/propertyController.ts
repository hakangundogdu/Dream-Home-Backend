import { Request, Response, NextFunction } from "express";
import Listing from "../models/property";

export const getFeatured = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const randomListings = await Listing.aggregate([
      { $match: { status: "sale" } },
      { $sample: { size: 12 } },
    ]);
    res.status(200).json(randomListings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    next(error);
  }
};

export const getProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { city, status, sort } = req.query;

  if (!city || !status) {
    res.status(400);
    const error = new Error("Please provide a city and status");

    return next(error);
  }
  try {
    const sortOrder = sort === "desc" ? -1 : 1;
    const listings = await Listing.find({
      city,
      status,
    }).sort({ price: sortOrder });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
