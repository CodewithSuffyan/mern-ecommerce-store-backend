import express from "express";
import Category from "../models/category.model.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all categories (public)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create category (admin only)
router.post("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const category = new Category({ name, imageUrl });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
