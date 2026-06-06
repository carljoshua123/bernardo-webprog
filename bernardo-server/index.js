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
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    if (/\.vercel\.app$/.test(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: false,
};
app.use(cors(corsOptions));

// ====================
// TEST ROUTES
// ====================
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Backend running" });
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
// BIND PORT FOR LOCAL OR RENDER
// ====================
const PORT = process.env.PORT || 8000; // <- Render sets PORT dynamically
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;