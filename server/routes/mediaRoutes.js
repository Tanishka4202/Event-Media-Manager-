const express = require("express");

const router = express.Router();

const multer = require("multer");

const path = require("path");

const Media = require("../models/Media");

const Event = require("../models/Event");
const protect =
  require("../middleware/authMiddleware");

const allowRoles =
  require("../middleware/roleMiddleware");
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

  protect,

  allowRoles(

    "admin",

    "photographer"

  ),

  upload.single("media"),

  async (req, res) => {

    try {

      const {

        eventId,

        uploadedBy,

        visibility,

        caption

      } = req.body;

      const aiTags =
        generateTags(

          req.file.originalname
        );
      const result = req.file;

      const media =
        await Media.create({

          url:
            `/uploads/${req.file.filename}`,

          type:
            req.file.mimetype.startsWith(

              "video"

            )

              ? "video"

              : "image",

          eventId,

          uploadedBy,

          visibility,

          caption,

          tags: aiTags,

        });

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
/* GET EVENT MEDIA */
/* ========================= */


router.get(

  "/all",

  async (req, res) => {

    try {

      const media =
        await Media.find()

        .sort({

          createdAt: -1

        });

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

router.put("/like/:id", async (req, res) => {

  try {

    const { userId } = req.body;

    const media =
      await Media.findById(req.params.id);

    if (!media) {

      return res.status(404).json({
        message: "Media not found"
      });

    }

    // SAFETY FIX

    media.likes =
      media.likes.map((like) =>

        typeof like === "object"
          ? like.userId
          : like

      );

    const alreadyLiked =
      media.likes.includes(userId);

    if (alreadyLiked) {

      media.likes =
        media.likes.filter(
          (id) => id !== userId
        );

    } else {

      media.likes.push(userId);

    }

    await media.save();

    res.json(media);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});

/* ========================= */
/* COMMENT */
/* ========================= */
router.post(
  "/comment/:id",
  async (req, res) => {

    try {

      const { user, text } =
        req.body;

      if (!text) {

        return res.status(400).json({
          message: "Comment required"
        });

      }

      const media =
        await Media.findById(
          req.params.id
        );

      if (!media) {

        return res.status(404).json({
          message: "Media not found"
        });

      }

      const newComment = {

        user,
        text

      };

      media.comments.unshift(
        newComment
      );

      await media.save();

      res.json(media);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/* ========================= */
/* FAVOURITE */
/* ========================= */

router.put(
  "/save/:id",
  async (req, res) => {

    try {

      const { userEmail } =
        req.body;

      const media =
        await Media.findById(
          req.params.id
        );

      if (!media) {

        return res.status(404).json({
          message: "Media not found"
        });

      }

      const alreadySaved =
        media.savedBy.includes(
          userEmail
        );

      if (alreadySaved) {

        media.savedBy =
          media.savedBy.filter(
            (email) =>
              email !== userEmail
          );

      } else {

        media.savedBy.push(
          userEmail
        );

      }

      await media.save();

      res.json(media);

    }

    catch (error) {

      res.status(500).json({
        message: error.message
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