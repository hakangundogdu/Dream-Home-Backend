import mongoose, { Schema, Document } from "mongoose";

interface ISavedListing {
  id: string;
  savedAt: Date;
}

interface IUser extends Document {
  uid: string;
  saved: ISavedListing[];
}

const savedListingSchema = new Schema({
  id: { type: String, required: true, unique: true },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema: Schema = new Schema({
  uid: { type: String, required: true },
  saved: {
    type: [
      {
        type: savedListingSchema,
        _id: false,
      },
    ],
    required: true,
  },
});
const User = mongoose.model<IUser>("User", userSchema);

export default User;
