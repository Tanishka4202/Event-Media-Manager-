const express = require("express");

const multer = require("multer");

const cloudinary =
    require("../config/cloudinary");

const Media =
    require("../models/Media");

const router = express.Router();

const storage = multer.memoryStorage();
const authMiddleware = require("../middleware/authMiddleware");
const upload = multer({
    storage
});


// UPLOAD ROUTE

router.post(

    "/upload",
     authMiddleware,

    upload.single("file"),

    async (req, res) => {

        try {

            // CONVERT FILE

            const b64 = Buffer
                .from(req.file.buffer)
                .toString("base64");

            const dataURI =

                "data:" +

                req.file.mimetype +

                ";base64," +

                b64;

            // CLOUDINARY UPLOAD

            const result =
                await cloudinary.uploader.upload(
                    dataURI
                );

            // AI TAGS

            const randomTags = [

                "crowd",
                "event",
                "sports",
                "fest",
                "concert",
                "college",
                "workshop",
                "trip"

            ];

            const selectedTags =

                randomTags

                    .sort(() => 0.5 - Math.random())

                    .slice(0, 3);

            // SAVE MEDIA

            const media =
                await Media.create({
                    mediaUrl:
                    result.secure_url,
                    
                    mediaType:
                    req.file.mimetype,
                    
                    tags:
                    selectedTags,
                    
                    caption:
                    "AI generated event memory 📸",
                    
                    uploadedBy: req.user.id,
                    visibility:
                        req.body.visibility ||

                        "Public"

                });

            res.json({

                message:
                    "Image uploaded 🚀",

                media

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    error.message

            });

        }

    }

);


// GET ALL MEDIA

router.get(

    "/all",

    async (req, res) => {

        try {

            const media =
                await Media.find();

            res.json(media);

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    }

);
router.get(

    "/my-uploads",

    authMiddleware,

    async (req, res) => {

        try {

            const media =
                await Media.find({

                    uploadedBy:
                        req.user.id

                });

            res.json(media);

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    }

);

// LIKE

router.put(

    "/like/:id",

    async (req, res) => {

        try {

            const media =
                await Media.findById(
                    req.params.id
                );

            media.likes += 1;

            await media.save();

            res.json(media);

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    }

);


// COMMENT

router.put(

    "/comment/:id",

    async (req, res) => {

        try {

            const media =
                await Media.findById(
                    req.params.id
                );

            media.comments.push({

                text: req.body.text

            });

            await media.save();

            res.json(media);

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    }

);


module.exports = router;