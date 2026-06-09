const express = require("express");

const router = express.Router();

const multer = require("multer");

const path = require("path");

const Media = require("../models/Media");

const Event = require("../models/Event");

const generateTags =
require("../utils/generateTags");

/* STORAGE */

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    cb(

      null,

      Date.now() +

      path.extname(file.originalname)

    );

  }

});

const upload = multer({

  storage

});

/* ========================= */
/* UPLOAD MEDIA */
/* ========================= */

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

      /* BODY DATA */

      const caption =
        req.body.caption;

      const eventId =
        req.body.eventId;

      const uploadedBy =
        req.body.uploadedBy;

      /* FIND EVENT */

      const event =
        await Event.findById(
          eventId
        );

      /* GENERATE TAGS */

      let tags = [];

      console.log(
        "GENERATING TAGS..."
      );

      try {

        tags =
          await generateTags(

            event?.name || "",

            event?.description || "",

            caption || ""

          );

        console.log(
          "TAGS:",
          tags
        );

      }

      catch (error) {

        console.log(

          "TAG ERROR:",

          error.message

        );

      }

      /* CREATE MEDIA */

      const mediaItem =
        await Media.create({

          url:
            `http://localhost:5000/uploads/${file.filename}`,

          type:
            file.mimetype.startsWith("image")

              ? "image"

              : "video",

          eventId,

          uploadedBy,

          caption,

          tags

        });

      res.status(201).json({

        message: "Uploaded",

        media: mediaItem

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

/* ========================= */
/* GET EVENT MEDIA */
/* ========================= */

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

/* ========================= */
/* DELETE MEDIA */
/* ========================= */

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

/* ========================= */
/* LIKE MEDIA */
/* ========================= */

router.put(

  "/like/:id",

  async (req, res) => {

    try {

      const { userId } =
        req.body;

      const media =
        await Media.findById(

          req.params.id

        );

      const alreadyLiked =
        media.likes.includes(
          userId
        );

      if (alreadyLiked) {

        media.likes =
          media.likes.filter(

            id => id !== userId

          );

      }

      else {

        media.likes.push(
          userId
        );

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

/* ========================= */
/* COMMENT */
/* ========================= */

router.post(

  "/comment/:id",

  async (req, res) => {

    try {

      const { user, text } =
        req.body;

      const media =
        await Media.findById(

          req.params.id

        );

      if (!media) {

        return res.status(404).json({

          message:
            "Media not found"

        });

      }

      media.comments.unshift({

        user,

        text

      });

      await media.save();

      res.json(media);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

/* ========================= */
/* FAVOURITE */
/* ========================= */

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

/* ========================= */
/* TAG USERS */
/* ========================= */

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

module.exports = router;