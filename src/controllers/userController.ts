import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user";
import Listing from "../models/property";

export const saveProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid, id } = req.body;

  try {
    let user = await UserModel.findOne({ uid });
    if (!user) {
      user = new UserModel({ uid, saved: [] });
    }

    // Ensure the saved array is properly structured
    if (!Array.isArray(user.saved)) {
      user.saved = [];
    }

    // Check if the property is already saved
    const isAlreadySaved = user.saved.some(
      (savedProperty) => savedProperty.id === id
    );
    if (isAlreadySaved) {
      return res.status(400).json({ message: "Property already saved" });
    }

    user.saved.push({ id: id, savedAt: new Date() });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error saving property." });
  }
};

export const deleteSavedProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid, id } = req.body;

  try {
    let user = await UserModel.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!Array.isArray(user.saved)) {
      user.saved = [];
    }

    const initialLength = user.saved.length;
    user.saved = user.saved.filter((savedProperty) => savedProperty.id !== id);

    if (user.saved.length === initialLength) {
      return res
        .status(400)
        .json({ message: "Property not found in saved list" });
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error deleting saved property." });
  }
};

export const getSavedProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.params;

  try {
    const user = await UserModel.findOne({ uid });

    if (!user) {
      return res.status(200).json([]);
    }

    const savedListings = user.saved;

    const listingIds = savedListings.map((savedListing) => savedListing.id);

    const listings = await Listing.find({ _id: { $in: listingIds } });

    const listingsWithTimestamps = listings.map((listing) => {
      const savedListing = savedListings.find(
        (saved) => saved.id.toString() === listing.id
      );

      return {
        ...listing.toObject(),
        savedAt: savedListing!.savedAt,
      };
    });

    listingsWithTimestamps.sort(
      (a, b) => b.savedAt.getTime() - a.savedAt.getTime()
    );

    res.status(200).json(listingsWithTimestamps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
