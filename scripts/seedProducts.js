const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load .env from backend folder
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Product Model
const Product = require("../models/Product");

// Check Mongo URI
console.log("MONGO_URI =", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for seeding");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log("Existing products cleared");

    const sampleProducts = [
  {
    title: "Handcrafted Ceramic Vase",
    slug: "handcrafted-ceramic-vase",
    description: "A beautifully handcrafted ceramic vase, perfect for home decor.",
    price: 45,
    countInStock: 10,
    image: "https://via.placeholder.com/400x300?text=Ceramic+Vase",
    isFeatured: true,
    isActive: true,
  },
  {
    title: "Woven Tapestry",
    slug: "woven-tapestry",
    description: "Detailed woven tapestry made from natural fibers.",
    price: 120,
    countInStock: 5,
    image: "https://via.placeholder.com/400x300?text=Woven+Tapestry",
    isActive: true,
  },
  {
    title: "Silver Necklace",
    slug: "silver-necklace",
    description: "Elegant silver necklace with intricate design.",
    price: 85,
    countInStock: 8,
    image: "https://via.placeholder.com/400x300?text=Silver+Necklace",
    isActive: true,
  },
];
    await Product.insertMany(sampleProducts);

    console.log("Sample products inserted successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

(async () => {
  await connectDB();
  await seedProducts();
})();
