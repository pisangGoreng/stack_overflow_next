import { Schema, Document, model, models } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[]; // relations to question
  followers: Schema.Types.ObjectId[]; // relations to followers
  createdOn: Date;
}

const TaqSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question", // assuming that the related documents are in a 'Question' collection
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // assuming that the related documents are in a 'User' collection
    },
  ],
  createdOn: { type: Date, default: Date.now },
});

const Tag = models.Tag || model("Tag", TaqSchema);

export default Tag;
