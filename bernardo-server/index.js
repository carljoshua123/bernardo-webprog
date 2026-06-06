require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Allow Postman, browser direct requests, and server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    // Allow local frontend
    if (origin.startsWith("http://localhost:")) {
      return callback(null, true);
    }

    // Allow all Vercel frontend previews and production domains
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options(/.*/, cors(corsOptions));

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Wet Carbon Backend Running",
  });
});

// DB Test Route
app.get("/test-db", async (req, res) => {
  try {
    const User = require("./models/User");
    const count = await User.countDocuments();

    res.status(200).json({
      success: true,
      message: "Database connected",
      users: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Connect Database
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// Local Development Only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;