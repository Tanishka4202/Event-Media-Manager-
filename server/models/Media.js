const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({

    mediaUrl: {
        type: String
    },

    mediaType: {
        type: String
    },

    tags: [
        String
    ],

    caption: {
        type: String
    },
    uploadedBy: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User"

},

    visibility: {
        type: String,
        default: "Public"
    },


    likes: {
        type: Number,
        default: 0
    },

    comments: [

        {
            text: String
        }

    ]

},

{
    timestamps: true
});

module.exports =
    mongoose.model(
        "Media",
        mediaSchema
    );