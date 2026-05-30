const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const USER_ID = "6a0ff6f259bf5f0e3fd89a9c";

const categoryMap = {
  "Handmade Jewelry": "6a1ace6fc2c122e2bfe602b8",
  "Pottery & Ceramics": "6a1ace6fc2c122e2bfe602b9",
  "Wooden Crafts": "6a1ace6fc2c122e2bfe602ba",
  "Paintings": "6a1ace6fc2c122e2bfe602bb",
  "Home Decor": "6a1ace6fc2c122e2bfe602bc",
  "Textiles": "6a1ace6fc2c122e2bfe602bd",
  "Candles": "6a1ace6fc2c122e2bfe602be",
  "Bamboo Crafts": "6a1ace6fc2c122e2bfe602bf",
  "Terracotta Art": "6a1ace6fc2c122e2bfe602c0",
  "Crochet Products": "6a1ace6fc2c122e2bfe602c1",
};

const productsData = [
  ["Silver Lotus Pendant","Handmade Jewelry"],
  ["Pearl Artisan Necklace","Handmade Jewelry"],
  ["Copper Bracelet","Handmade Jewelry"],
  ["Traditional Earrings","Handmade Jewelry"],
  ["Vintage Anklet","Handmade Jewelry"],

  ["Rustic Clay Vase","Pottery & Ceramics"],
  ["Handcrafted Tea Mug","Pottery & Ceramics"],
  ["Decorative Ceramic Bowl","Pottery & Ceramics"],
  ["Artisan Flower Pot","Pottery & Ceramics"],
  ["Pottery Dinner Set","Pottery & Ceramics"],

  ["Hand-Carved Elephant","Wooden Crafts"],
  ["Wooden Wall Art","Wooden Crafts"],
  ["Rustic Jewelry Box","Wooden Crafts"],
  ["Wooden Photo Frame","Wooden Crafts"],
  ["Wooden Table Decor","Wooden Crafts"],

  ["Sunset Canvas Painting","Paintings"],
  ["Village Landscape Art","Paintings"],
  ["Abstract Wall Painting","Paintings"],
  ["Traditional Folk Art","Paintings"],
  ["Nature Inspired Painting","Paintings"],

  ["Boho Wall Hanging","Home Decor"],
  ["Decorative Lantern","Home Decor"],
  ["Artisan Mirror Frame","Home Decor"],
  ["Handmade Table Accent","Home Decor"],
  ["Vintage Decorative Piece","Home Decor"],

  ["Handwoven Shawl","Textiles"],
  ["Traditional Table Runner","Textiles"],
  ["Cotton Wall Textile","Textiles"],
  ["Handloom Cushion Cover","Textiles"],
  ["Woven Decorative Cloth","Textiles"],

  ["Lavender Soy Candle","Candles"],
  ["Vanilla Scent Candle","Candles"],
  ["Rose Aroma Candle","Candles"],
  ["Handcrafted Jar Candle","Candles"],
  ["Festival Decorative Candle","Candles"],

  ["Bamboo Basket","Bamboo Crafts"],
  ["Eco Bamboo Lamp","Bamboo Crafts"],
  ["Bamboo Storage Box","Bamboo Crafts"],
  ["Handmade Bamboo Tray","Bamboo Crafts"],
  ["Decorative Bamboo Piece","Bamboo Crafts"],

  ["Terracotta Vase","Terracotta Art"],
  ["Traditional Clay Sculpture","Terracotta Art"],
  ["Terracotta Wall Decor","Terracotta Art"],
  ["Artisan Clay Pot","Terracotta Art"],
  ["Decorative Terracotta Lamp","Terracotta Art"],

  ["Crochet Teddy Bear","Crochet Products"],
  ["Crochet Flower Basket","Crochet Products"],
  ["Handmade Crochet Bag","Crochet Products"],
  ["Crochet Table Mat","Crochet Products"],
  ["Crochet Home Decor","Crochet Products"],
];
const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log('Existing products cleared');

    const sampleProducts = productsData.map((item, index) => ({
  user: new mongoose.Types.ObjectId(USER_ID),

  title: item[0],

  slug: item[0]
    .toLowerCase()
    .replace(/\s+/g, "-"),

  description: `Premium handmade artisan product: ${item[0]}. Crafted with care using traditional techniques and high-quality materials.`,

  price: Math.floor(Math.random() * 4000) + 500,

  discountPrice: 0,

  category: new mongoose.Types.ObjectId(
    categoryMap[item[1]]
  ),

  countInStock: Math.floor(Math.random() * 25) + 5,

image: `https://picsum.photos/seed/handmade${index + 1}/400/300`,
  images: [],

  rating: Number(
    (Math.random() * 1.5 + 3.5).toFixed(1)
  ),

  numReviews: Math.floor(Math.random() * 50),

  isFeatured: index < 10,

  isActive: true,
}));

    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

(async () => {
  await connectDB();
  await seedProducts();
})();
