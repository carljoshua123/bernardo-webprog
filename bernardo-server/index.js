require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bernardo-webprog.vercel.app",
    ],
    credentials: true,
  })
);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Wet Carbon Backend Running",
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

// Local Development Only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;