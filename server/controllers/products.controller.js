const mongoose = require("mongoose");
const Product = require("../models/products.model");

const fs = require("fs");
const path = require("path");

const productController = {
  postData: async (req, res) => {
    try {
      const dbPath = path.join(__dirname, "..", "db.json");

      const fileData = fs.readFileSync(dbPath, "utf-8");

      const catalogData = JSON.parse(fileData);

      if (!Array.isArray(catalogData)) {
        return res
          .status(400)
          .json({ message: "Invalid data format in db.json" });
      }

      await Product.insertMany(catalogData);

      res.status(201).json({ message: "Catalog data saved successfully" });
    } catch (error) {
      console.error("Error saving catalog data:", error);
      res
        .status(500)
        .json({ message: "Failed to save catalog data", error: error.message });
    }
  },
  getProduct: async (req, res) => {
    const category = req.query.category || "";
    const sort = req.query.sort || "";
    const minPrices = req.query.minPrice;
    const maxPrices = req.query.maxPrice;
    const search = req.query.search;

    let query = {};

    if (category && category !== "all") {
      query.typeofproduct = category;
    }

    // Price Filter
    if (minPrices && maxPrices) {
      const minArray = Array.isArray(minPrices) ? minPrices : [minPrices];
      const maxArray = Array.isArray(maxPrices) ? maxPrices : [maxPrices];

      const priceConditions = minArray.map((min, index) => {
        const max = maxArray[index] || min;
        return { price: { $gte: parseInt(min), $lte: parseInt(max) } };
      });

      query.$or = priceConditions;
    }

    // Search Filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { typeofproduct: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting
    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    else if (sort === "desc") sortOption.price = -1;

    try {
      const products = await Product.find(query).sort(sortOption);
      return res.status(200).json(products);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById({ _id: id });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  },
  deleteProductByname: async (req, res) => {
    const name = req.body;
    if (!name || !name.name) {
      return res.status(400).json({ message: "Product name is required" });
    }
    try {
      const product = await Product.findOneAndDelete({ title: name.name });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = productController;
