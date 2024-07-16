import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string; // untuk clerk auth
  name: string;
  username: string;
  email: string;
  password?: string; // optional, karena kalau user pakai CLERK, dia login pakai email
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[]; // untuk relasi postingan2 yg di save oleh user tersebut
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question", // assuming that the related documents are in a 'Post' collection
    },
  ],
  joinedAt: {
    type: Date,
    default: Date.now, // default to current date and time
    required: true,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
