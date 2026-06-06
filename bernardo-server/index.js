require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

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
// CORS CONFIG (for localhost + deployed frontend)
// ====================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://bernardo-webprog.vercel.app", // main frontend deployed on Vercel
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server requests
    if (!origin) return callback(null, true);

    // Exact matches allowed
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // Allow any Vercel subdomain
    if (/\.vercel\.app$/.test(origin)) return callback(null, true);

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // set to true if you use cookies/sessions
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
// LOCAL DEVELOPMENT
// ====================
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ====================
// EXPORT FOR RENDER / SERVERLESS
// ====================
module.exports = app;