const user = await User.create({

  name,

  email,

  password,

  role: "viewer"

});