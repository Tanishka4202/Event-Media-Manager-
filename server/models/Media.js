const mongoose =
  require("mongoose");

const mediaSchema =
  new mongoose.Schema({

    url: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: [
        "image",
        "video"
      ]
    },

    eventId: {
      type: String,
      required: true
    },

    uploadedBy: {
      type: String
    },
caption: {
  type: String
},
    likes: [

      {

        userId: String

      }

    ],

    comments: [

      {

        user: String,

        text: String,

        createdAt: {

          type: Date,

          default: Date.now

        }

      }

    ],

    favourites: [

      {

        userId: String

      }

    ],

    taggedUsers: [

      {

        name: String

      }

    ]

  },

  {

    timestamps: true

  }

);

module.exports =
  mongoose.model(
    "Media",
    mediaSchema
  );