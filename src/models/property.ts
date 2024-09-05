import mongoose, { Schema, Document } from "mongoose";

export interface IListing extends Document {
  listing_id: string;
  address: string;
  agent: string;
  bedrooms: number;
  bathrooms: number;
  livingRooms: number;
  city: string;
  status: string;
  latitude: number;
  longitude: number;
  price: number;
  priceLabel: string;
  title: string;
  images: string[];
}

const ListingSchema: Schema = new Schema(
  {
    listing_id: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    agent: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    livingRooms: { type: Number, required: true },
    city: { type: String, required: true },
    status: { type: String, required: true },
    latitude: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v: mongoose.Types.Decimal128) => parseFloat(v.toString()),
    },
    longitude: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v: mongoose.Types.Decimal128) => parseFloat(v.toString()),
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v: mongoose.Types.Decimal128) => parseFloat(v.toString()),
    },
    priceLabel: { type: String, required: true },
    title: { type: String, required: true },
    images: { type: [String], required: true },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

export default mongoose.model<IListing>("Listing", ListingSchema);
