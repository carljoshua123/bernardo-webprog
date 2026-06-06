require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// ====================
// DATABASE
// ====================
connectDB();

// ====================
// MIDDLEWARE
// ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================
// CORS
// ====================
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// ====================
// TEST ROUTES
// ====================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Wet Carbon Backend Running",
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const User = require("./models/User");

    const count = await User.countDocuments();

    res.json({
      success: true,
      users: count,
      message: "Database Connected",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ====================
// API ROUTES
// ====================
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// ====================
// ERROR HANDLER
// ====================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// ====================
// LOCALHOST ONLY
// ====================
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// ====================
// EXPORT FOR VERCEL
// ====================
module.exports = app;