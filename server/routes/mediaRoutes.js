const express = require("express");

const router = express.Router();

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    cb(

      null,

      Date.now() + path.extname(file.originalname)

    );

  }

});

const upload = multer({ storage });
const Media = require("../models/Media");


// UPLOAD

router.post(

  "/upload",

  upload.single("file"),

  async (req, res) => {
    console.log("UPLOAD ROUTE HIT");

    try {

      const file = req.file;

      if (!file) {

        return res.status(400).json({

          message: "No file uploaded"

        });

      }

      const mediaItem = {

        url: `http://localhost:5000/uploads/${file.filename}`,

        type:
          file.mimetype.startsWith("image")
            ? "image"
            : "video",

        eventId:
          req.body.eventId,

        uploadedBy:
          req.body.uploadedBy,

        caption: req.body.caption

      };

      await Media.create(
        mediaItem
      );

      res.status(201).json({

        message: "Uploaded",

        media: mediaItem

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message: error.message

      });

    }

  }

);


// GET MEDIA

router.get(

  "/all/:eventId",

  async (req, res) => {

    try {

      const media =

        await Media.find({

          eventId:
            req.params.eventId

        });

      res.json(media);

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

router.delete(

  "/:id",

  async (req, res) => {

    try {

      await Media.findByIdAndDelete(
        req.params.id
      );

      res.json({

        message:
          "Media deleted"

      });

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);
router.put(

  "/like/:id",

  async (req, res) => {

    try {

      const media =
        await Media.findById(
          req.params.id
        );

      const alreadyLiked =
        media.likes.includes(userId);

      if (alreadyLiked) {

        media.likes =
          media.likes.filter(
            id => id !== userId
          );

      }

      else {

        media.likes.push(userId);

      }

      await media.save();

      res.json(media);

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);
router.post(

  "/comment/:id",

  async (req, res) => {

    try {

      const { user, text } =
        req.body;

      const mediaItem =
        await Media.findById(
          req.params.id
        );

      if (!mediaItem) {

        return res.status(404).json({

          message: "Media not found"

        });

      }

      mediaItem.comments.unshift({

        user,

        text

      });

      await mediaItem.save();

      res.json(mediaItem);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message: error.message

      });

    }

  }

);
router.put(

  "/comment/:id",

  async (req, res) => {

    try {

      const media =
        await Media.findById(
          req.params.id
        );

      media.comments.push({

        user:
          req.body.user,

        text:
          req.body.text

      });

      await media.save();

      res.json(media);

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

router.put(

  "/favourite/:id",

  async (req, res) => {

    try {

      const media =
        await Media.findById(
          req.params.id
        );

      media.favourites.push({

        userId:
          req.body.userId

      });

      await media.save();

      res.json(media);

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

router.put(

  "/tag/:id",

  async (req, res) => {

    try {

      const media =
        await Media.findById(
          req.params.id
        );

      media.taggedUsers.push({

        name:
          req.body.name

      });

      await media.save();

      res.json(media);

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);
router.put(

  "/save/:id",

  async (req, res) => {

    try {

      const { userEmail } =
        req.body;

      const mediaItem =
        await Media.findById(
          req.params.id
        );

      if (!mediaItem) {

        return res.status(404).json({

          message: "Media not found"

        });

      }

      const alreadySaved =

        mediaItem.savedBy.includes(
          userEmail
        );

      if (alreadySaved) {

        mediaItem.savedBy =

          mediaItem.savedBy.filter(

            email =>
              email !== userEmail

          );

      }

      else {

        mediaItem.savedBy.push(
          userEmail
        );

      }

      await mediaItem.save();

      res.json(mediaItem);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message: error.message

      });

    }

  }

);

module.exports = router;