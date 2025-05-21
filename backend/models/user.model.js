/*
users [icon: user]{
  id string pk                
  username string       // from Google profile 
  email string unique       // from Google 
  providerId string unique     // Google's 'sub' field 
  profilePicUrl string     // optional: from Google 
  refreshToken string
  createdAt date
  updatedAt date
}
*/

import bcrypt from "bcrypt"
import mongoose, { Schema } from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



// defining the whole model
  const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
      },
      providerId: {
        type: String,
        required: true,
        unique: true,
      },
      profilePicUrl: {
        type: String, // Cloudinary URL
        required: true,
      },
      refreshToken: {
        type: String,
        default: "",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true } // Automatically handles createdAt & updatedAt
  );

  
//setting up JSON web token for access
userSchema.methods.generateAccessToken = function () {
  // short lived access token
  // this is the payload
  return jsonwebtoken.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName,
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  })
};


userSchema.methods.generateRefreshToken = function () {
  // short lived access token
  // this is the payload
  return jsonwebtoken.sign({
    _id: this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  })
};


  
export const User = mongoose.model("User", userSchema);
  