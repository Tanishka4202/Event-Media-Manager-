const express = require("express");

const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            visibility
        } = req.body;

        const event = await Event.create({

            title,
            description,
            category,
            visibility,

            createdBy: req.user.id

        });

        res.status(201).json({
            message: "Event created successfully",
            event
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.get("/", async (req, res) => {

    try {

        const events = await Event.find()
        .populate("createdBy", "name email");

        res.status(200).json(events);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;