import { Request, Response, NextFunction } from "express";
import Listing, { IListing } from "../models/property";

export const getFeatured = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
  try {
    const { city, status } = req.params;
    const { sort } = req.query;
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

/*export const getProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { data: listingData, error: listingError } = await supabase
      .from("listings")
      .select()
      .eq("id", id)
      .single();

    if (listingError) {
      console.error("Error fetching listing:", listingError.message);
      return { listing: null, photos: [] };
    }

    const { data: photosData, error: imagesError } = await supabase
      .from("images")
      .select()
      .eq("listingId", id);
    if (imagesError) {
      console.error("Error fetching photos:", imagesError.message);
    }

    res.status(200).json({ listing: listingData, images: photosData || [] });
  } catch (error) {
    next(error);
  }
};

export const getFeatured = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data } = await supabase.from("featured").select("*");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}; */

/* export const getSavedProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { savedIds } = req.body;
  console.log(savedIds);

  try {
    if (!Array.isArray(savedIds)) {
      return res.status(400).json({ error: "Invalid savedIds format" });
    }
    const { data } = await supabase
      .from("listings")
      .select()
      .in("id", savedIds);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}; */
