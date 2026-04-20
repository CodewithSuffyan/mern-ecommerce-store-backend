import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Add this import
// import path from "path";
import categoryRoutes from "./routes/category.route.js";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 6000;

// CORS configuration
const corsOptions = {
  origin: [
    "https://mern-ecommerce-store-frontend-five.vercel.app",
    "http://localhost:5173", // For local development
    "http://localhost:3000", // Alternative local port
  ],
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/categories", categoryRoutes);

// Health check endpoint for Vercel
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

app.get("/", (req, res) => {
  res.send(`Server is running in ${process.env.NODE_ENV} mode`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Only connect to DB and listen when not in Vercel serverless environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    connectDB();
  });
}

// Export for Vercel
export default app;