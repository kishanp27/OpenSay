import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import User from "../MongoDB/Models/User.js";
import Post from "../MongoDB/Models/Post.js";

const createPost = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  const { text } = req.body;
  const post = new Post({
    userId,
    text,
  });

  await post.save();
  await User.findByIdAndUpdate(userId, {
    $push: { posts: post._id },
  });

  res.status(201).json({
    message: "Post created successfully!",
    post: {
      text: post.text,
      userId: post.userId,
      postId: post._id
    },
  });
});

const getUserPosts = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  const posts = await Post.find({ userId });

  res.status(200).json({
    message: "Posts fetched successfully!",
    posts
  });
});

const getAllPosts = asyncErrorHandler(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    message: "Posts fetched successfully!",
    posts,
  });
});

const deletePost = asyncErrorHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.userId.toString();
  const post = await Post.findById(postId);

  if (!post) {
    const err = new Error("Post not found");
    err.statusCode = 404;
    next(err);
    return;
  }

  if (userId !== post.userId.toString()) {
    const err = new Error("Unauthorized");
    err.statusCode = 403;
    next(err);
    return;
  }

  await post.deleteOne();
  
  await User.findByIdAndUpdate(userId, {
    $pull: {posts: postId}
  })

  res.status(201).json({
    message: "Posts deleted successfully!",
    post: {
      post,
    },
  });
});

export { createPost, getUserPosts, getAllPosts, deletePost };
