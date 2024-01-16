import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import Post from "./Post.js";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      minLength: [4, "Password must be atleast 4 characters"],
    },
    posts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(8);
  const hashedpassword = await bcrypt.hash(this.password, salt);
  this.password = hashedpassword;
  next();
});

UserSchema.pre("deleteOne", { document: true }, async function (next) {
  try {
    await Post.deleteMany({ userId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  const match = await bcrypt.compare(enteredPassword, this.password);
  return match;
};

const User = model("User", UserSchema);
export default User;
