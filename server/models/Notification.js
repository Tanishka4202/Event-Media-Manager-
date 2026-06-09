const mongoose = require("mongoose");

const notificationSchema =
  new mongoose.Schema(

    {

      sender: {
        type: String
      },

      receiver: {
        type: String
      },

      text: {
        type: String
      },

      type: {
        type: String
      },

      mediaId: {
        type: String
      },

      read: {

        type: Boolean,

        default: false

      }

    },

    {

      timestamps: true

    }

  );

module.exports =
  mongoose.model(

    "Notification",

    notificationSchema

  );