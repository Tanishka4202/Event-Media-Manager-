const express = require("express");

const router = express.Router();

const Notification =
  require("../models/Notification");

// CREATE NOTIFICATION

router.post(

  "/create",

  async (req, res) => {

    try {

      const notification =

        await Notification.create(
          req.body
        );

      res.json(notification);

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

// GET USER NOTIFICATIONS

router.get(

  "/:receiver",

  async (req, res) => {

    try {

      const notifications =

        await Notification.find({

          receiver:
            req.params.receiver

        })

        .sort({

          createdAt: -1

        });

      res.json(
        notifications
      );

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

// MARK AS READ

router.put(

  "/read/:id",

  async (req, res) => {

    try {

      const notification =

        await Notification.findByIdAndUpdate(

          req.params.id,

          {

            read: true

          },

          {

            new: true

          }

        );

      res.json(notification);

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

module.exports = router;