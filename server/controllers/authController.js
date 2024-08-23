import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/User.js"
// import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Login
const Login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (!user) {
    res.status(401)
    throw new Error("Wrong Credentials!")

  }
  if (!(await user.matchPassword(req.body.password))) {
    res.status(401)
    throw new Error("Wrong Credentials")
  }
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  })

  //  set Jwt as an http only cookie
  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000 //30days

  }
  )

  return res.status(200).json({
    id: user._id,
    name: user.username,
    email: user.email,
    isAdmin: user.isAdmin
  })

})

// Register
const Register = asyncHandler(async (req, res) => {
  const existingUser = await User.findOne({
    username: req.body.username
  })
  if (existingUser) {
    res.status(401)
    throw new Error("User is Already Registered!")
  }
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  const saveUser = await user.save()
  return res.status(200).json(saveUser)
})

// Logout
const Logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: "Logged Out!" })
})
// Get the Logged User Profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    })
  }
  else {
    res.status(404)
    throw new Error("User Not Found!")
  }

})
// Update the logged user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    return res.status(200).json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin

    })

  } else {
    res.status(404)
    throw new Error("User Not Found!")
  }
})
// Get all user for admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get Users for admin")
})

// Get User by Id for admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get UserbyId for admin")
})

// Delete user for admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete User for admin")
})


// update User by Id for admin
const updateUserById = asyncHandler(async (req, res) => {
  res.send("update User for admin")
})

export { Login, Register, Logout, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUserById }





