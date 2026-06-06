require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// ====================
// DATABASE CONNECTION
// ====================
connectDB();

// ====================
// MIDDLEWARE
// ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================
// CORS CONFIG (fixed for localhost + deployed frontend)
// ====================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://bernardo-webprog.vercel.app",
  "https://bernardo-webprog-bemvez6tf-bernardo-projects-projects.vercel.app", // add your deployed frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (server-to-server / curl)
    if (!origin) return callback(null, true);

    // Exact matches allowed
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // Allow any Vercel subdomain
    if (/\.vercel\.app$/.test(origin)) return callback(null, true);

    // Reject everything else
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// ====================
// TEST ROUTES
// ====================
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Backend running" });
});

app.get("/test-db", async (req, res) => {
  try {
    const User = require("./models/User");
    const count = await User.countDocuments();
    res.status(200).json({ success: true, message: "Database Connected", users: count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
  console.error("SERVER ERROR:", err);
  res.status(500).json({ success: false, message: err.message });
});

// ====================
// LOCAL DEVELOPMENT ONLY
// ====================
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ====================
// EXPORT FOR VERCEL SERVERLESS
// ====================
module.exports = app;