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

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/media", mediaRoutes);

app.use("/api/events", eventRoutes);

io.on("connection", (socket) => {

    console.log("User Connected 🚀");

    socket.on("send_notification", (data) => {

        io.emit("receive_notification", data);

    });

});

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

    server.listen(5000, () => {

        console.log("Server running on port 5000");

    });

})

.catch((err) => {

    console.log(err);

});