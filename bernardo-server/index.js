require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// =======================
// CONNECT DATABASE
// =======================
connectDB();

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// CORS FIX
// =======================
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// =======================
// ROOT ROUTE
// =======================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Wet Carbon Backend Running",
  });
});

// =======================
// DATABASE TEST ROUTE
// =======================
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
    console.error("DB TEST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =======================
// API ROUTES
// =======================
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// =======================
// ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// =======================
// LOCALHOST ONLY
// =======================
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// =======================
// EXPORT FOR VERCEL
// =======================
module.exports = app;