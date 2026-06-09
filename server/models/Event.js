const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  category: {
    type: String
  },

  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public"
  },

  coverImage: {
    type: String
  },

  createdBy: {
    type: String
  }

}, {

  timestamps: true

});

module.exports = mongoose.model(
  "Event",
  eventSchema
);