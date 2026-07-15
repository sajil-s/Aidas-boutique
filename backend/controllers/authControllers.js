import bcrypt from "bcryptjs";
import validator from "validator";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
// import { use } from "react";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "all field required"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "invalid email"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "password must be atleast 6 characters"
            })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                message: "user already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password, salt
        )

        const user = await User.create({
            name, email, password: hashedPassword
        })

        if (user) {
            generateToken(res, user._id);

            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            })
        }
        return res.status(400).json({
            message: "invalid data"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required"
            })
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(
            password, user.password
        );
        if (!isMatch) {
            return res.status(401).json({
                message: "invalid user name or password"
            })
        }
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: "logged out successfully"
    })
}



const adminDashboard = async (
    req, res
) => {
    res.status(200).json({
        message: "welcome admin"
    })
}


const getProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        ).select("-password");

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      res.status(200).json(
        user
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export {
    registerUser, loginUser,
    logoutUser, getProfile,
    adminDashboard,
};