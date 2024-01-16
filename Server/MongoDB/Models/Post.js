import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Post = model('Post', postSchema);

export default Post;