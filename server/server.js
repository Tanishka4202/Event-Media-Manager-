const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const eventRoutes = require("./routes/eventRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const collectionRoutes = require("./routes/collectionRoutes");

const app = express();



// ======================
// MIDDLEWARES
// ======================

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));



// ======================
// BASIC ROUTE
// ======================

app.get("/", (req, res) => {
  res.send("EventSphere AI Backend Running 🚀");
});



// ======================
// ROUTES
// ======================

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/notifications", notificationRoutes);



// ======================
// SOCKET.IO SETUP
// ======================

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User Connected 🚀");

  socket.on("send_notification", (data) => {
    io.emit("receive_notification", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected ❌");
  });
});



// ======================
// DATABASE CONNECTION
// ======================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error ❌", err);
  });