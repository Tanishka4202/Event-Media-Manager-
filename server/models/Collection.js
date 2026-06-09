const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({

  name: String,

  userEmail: String,

  media: [

    {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Media"

    }

  ],

});

module.exports = mongoose.model(

  "Collection",

  collectionSchema

);