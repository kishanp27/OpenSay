import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import User from "../MongoDB/Models/User.js";
import generateToken from "../utils/generateToken.js";
import Token from "../MongoDB/Models/Token.js";
import crypto from 'crypto';
import verifyEmail from "../utils/verifyEmail.js";

const signupUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password, authType } = req.body;


  if(authType === 'google'){
    const user = await User.create({email});

    generateToken(res, user._id);

    res.status(201).json({
      message: "user signed up successfully!",
      user: {
        userId: user._id,
        email: user.email,
      },
    });

    return;
  }

  const user = new User({
    email,
    password,
  });

  await user.save()

  generateToken(res, user._id);
  

  res.status(201).json({
    message: "user signed up successfully!",
    user: {
      userId: user._id,
      email: user.email,
    },
  });
});

const signinUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password, authType } = req.body;

  let user = await User.findOne({ email });

  if(authType === 'google'){
    console.log('hi');
    if(!user){
      console.log('hi');
      user = await User.create({
        email
      })
    }
    generateToken(res, user._id);
    res.status(201).json({
      message: "user logged in successfully!",
      user: {
        userId: user._id,
        email: user.email,
      },
    });

    return;
  }

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    next(error);
    return;
  }

  if(await user.matchPassword(password) == false){
    const err = new Error("Wrong password");
    err.statusCode = 401;
    next(err);
    return;
  }
  generateToken(res, user._id);

  res.status(201).json({
    message: "user logged in successfully!",
    user: {
      userId: user._id,
      email: user.email,
    },
  });
});

const getLoggedInUser = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);

  if (!user) {
    const err = new Error("Unauthorized");
    err.statusCode = 403;
    next(err);
    return;
  }

  res.status(200).json({
    message: "Logged in User",
    user: {
      userId: user._id,
    },
  });
});

const logoutUser = asyncErrorHandler(async (req, res, next) => {
  // const user = await User.findById(req.body.userId);

  // if (!user) {
  //   const err = new Error("User not found");
  //   err.statusCode = 404;
  //   next(err);
  //   return;
  // }

  res.clearCookie("jwt", { 
    httpOnly: true, 
    secure: true,
    sameSite: 'None' 
  }).status(200).json({
    message: "User logged out",
  });
});

export { signupUser, signinUser, logoutUser, getLoggedInUser };
