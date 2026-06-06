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
// CORS CONFIG
// ====================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://bernardo-webprog.vercel.app",
  "https://bernardo-webprog-bemvez6tf-bernardo-projects-projects.vercel.app"
];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // server-to-server / curl
    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: false
};

app.use(cors(corsOptions));

// ====================
// TEST ROUTES
// ====================
app.get("/", (req, res) => res.json({ success: true, message: "Backend running" }));

app.get("/test-db", async (req, res) => {
  try {
    const User = require("./models/User");
    const count = await User.countDocuments();
    res.json({ success: true, message: "Database connected", users: count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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
// EXPORT FOR RENDER SERVERLESS
// ====================
module.exports = app;