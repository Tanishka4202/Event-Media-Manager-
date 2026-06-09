require("dotenv").config();

const axios = require("axios");

const generateTags = async (

  imageUrl

) => {

  try {

    const response =

      await axios.post(

        "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",

        {

          inputs: imageUrl

        },

        {

          headers: {

            Authorization:

              `Bearer ${process.env.HF_TOKEN}`

          }

        }

      );

    return response.data

      .slice(0,3)

      .map(item => item.label);

  }

  catch (error) {

    console.log(error.message);

    return [

      "event",

      "crowd",

      "festival"

    ];

  }

};

module.exports =
generateTags;