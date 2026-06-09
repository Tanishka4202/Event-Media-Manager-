const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authMiddleware =
    require("../middleware/authMiddleware");

const router = express.Router();


// REGISTER

router.post(

    "/register",

    async (req, res) => {

        try {

            const {

                name,
                email,
                password,
                role

            } = req.body;

            // CHECK USER

            const existingUser =
                await User.findOne({
                    email
                });

            if (existingUser) {

                return res.status(400).json({

                    message:
                        "User already exists"

                });

            }

            // HASH PASSWORD

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            // CREATE USER

            const user = await User.create({

                name,
                email,
                password: hashedPassword,
                role

            });

            // GENERATE TOKEN

            const token =
                jwt.sign(

                    {

                        id:
                            user._id,

                        role:
                            user.role

                    },

                    process.env.JWT_SECRET,

                    {

                        expiresIn:
                            "7d"

                    }

                );

            // RESPONSE

            res.status(201).json({

                message:
                    "User registered successfully",

                token,

                user: {

                    _id:
                        user._id,

                    name:
                        user.name,

                    email:
                        user.email

                }

            });

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    }

);


// LOGIN

router.post(

    "/login",

    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            // FIND USER

            const user =
                await User.findOne({
                    email
                });

            if (!user) {

                return res.status(400).json({

                    message:
                        "User not found"

                });

            }

            // PASSWORD CHECK

            const isMatch =
                await bcrypt.compare(

                    password,

                    user.password

                );

            if (!isMatch) {

                return res.status(400).json({

                    message:
                        "Invalid credentials"

                });

            }

            // TOKEN

            const token =
                jwt.sign(

                    {

                        id:
                            user._id,

                        role:
                            user.role

                    },

                    process.env.JWT_SECRET,

                    {

                        expiresIn:
                            "7d"

                    }

                );

            // RESPONSE

            res.status(200).json({

                message:
                    "Login successful",

                token,

                user: {

                    _id:
                        user._id,

                    name:
                        user.name,

                    email:
                        user.email

                }

            });

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    }

);


// CURRENT USER

router.get(

    "/me",

    authMiddleware,

    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                ).select("-password");

            res.json(user);

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    }

);


module.exports = router;