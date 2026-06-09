const express = require("express");

const router = express.Router();

const Event = require("../models/Event");


// CREATE EVENT

router.post("/create", async (req, res) => {

  try {

    const event = await Event.create(req.body);

    res.status(201).json(event);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});


// GET ALL EVENTS

router.get("/", async (req, res) => {

  try {

    const events = await Event.find();

    res.json(events);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});

module.exports = router;
// GET SINGLE EVENT

router.get("/:id", async (req, res) => {

  try {

    const event =
      await Event.findById(
        req.params.id
      );

    res.json(event);

  }

  catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

});

// DELETE EVENT

router.delete("/:id", async (req, res) => {

  try {

    const Event =
      require("../models/Event");

    const Media =
      require("../models/Media");

    // DELETE EVENT

    await Event.findByIdAndDelete(
      req.params.id
    );

    // DELETE MEDIA OF EVENT

    await Media.deleteMany({

      eventId: req.params.id

    });

    res.json({

      message:
        "Event deleted successfully"

    });

  }

  catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

});