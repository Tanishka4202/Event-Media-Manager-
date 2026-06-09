const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const http = require("http");

const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");

const mediaRoutes = require("./routes/mediaRoutes");

const eventRoutes = require("./routes/eventRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {

    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }

});

const notificationRoutes =
  require("./routes/notificationRoutes");

const collectionRoutes =require("./routes/collectionRoutes");

app.get("/", (req, res) => {

    res.send("EventSphere AI Backend Running 🚀");

});
app.use(
  cors({
    origin: "https://event-media-manager.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);
app.use("/api/media", mediaRoutes);
app.use( "/api/collections", collectionRoutes);
app.use(

  "/api/notifications",

  notificationRoutes

);

io.on("connection", (socket) => {

    console.log("User Connected 🚀");

    socket.on("send_notification", (data) => {

        io.emit("receive_notification", data);

    });

});

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {

        console.log(`Server running on ${PORT}`);

    });

})

.catch((err) => {

    console.log(err);

});