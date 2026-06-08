const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    coverImage: {
        type: String,
        default: ""
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    }

},
{
    timestamps: true
}
);

module.exports = mongoose.model("Event", eventSchema);