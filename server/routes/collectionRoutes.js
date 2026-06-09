const express = require("express");

const router = express.Router();

const Collection =
require("../models/Collection");



/* CREATE COLLECTION */

router.post(

  "/create",

  async (req, res) => {

    try {

      const collection =
        await Collection.create({

          name:
            req.body.name,

          userEmail:
            req.body.userEmail,

          media: []

        });

      res.json(collection);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message: error.message

      });

    }

  }

);



/* GET USER COLLECTIONS */

router.get(

  "/:email",

  async (req, res) => {

    try {

      const collections =

await Collection.find({

userEmail:
req.params.email

})

.populate("media");

res.json(collections);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message: error.message

      });

    }

  }

);



/* SAVE MEDIA INTO COLLECTION */

router.put(

  "/save",

  async (req, res) => {

    try {

      const {

        collectionId,

        mediaId

      } = req.body;

      const collection =

        await Collection.findById(

          collectionId

        );

      if (!collection) {

        return res.status(404).json({

          message:
            "Collection not found"

        });

      }

      const alreadySaved =

        collection.media.includes(
          mediaId
        );

      if (!alreadySaved) {

        collection.media.push(
          mediaId
        );

      }

      await collection.save();

      const updatedCollection =

        await Collection.findById(
          collectionId
        )

        .populate("media");

      res.json(updatedCollection);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message: error.message

      });

    }

  }

);



module.exports = router;