const user = await User.create({

  name,

  email,

  password,

  role: "viewer"

});
const jwt = require("jsonwebtoken");

const token = jwt.sign(

  {

    id: user._id

  },

  process.env.JWT_SECRET,

  {

    expiresIn: "30d"

  }

);

res.json({

  token,

  user

});