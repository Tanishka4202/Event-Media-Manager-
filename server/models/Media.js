const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["image", "video"],
      required: true
    },

    eventId: {
      type: String,
      required: true
    },

    uploadedBy: {
      type: String
    },

    caption: {
      type: String,
      default: ""
    },

    tags: {
      type: [String],
      default: []
    },

    likes: {
      type: [String],
      default: []
    },

    savedBy: {
      type: [String],
      default: []
    },

    shares: {
      type: Number,
      default: 0
    },

    comments: [
      {
        user: String,

        text: String,

        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Media",
  mediaSchema
);