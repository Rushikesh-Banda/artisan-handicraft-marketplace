const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const Category = require("../models/Category");

const categories = [
  {
    name: "Handmade Jewelry",
    slug: "handmade-jewelry",
    description: "Unique artisan jewelry",
    image: "https://picsum.photos/400/300?random=1",
    isFeatured: true,
  },
  {
    name: "Pottery & Ceramics",
    slug: "pottery-ceramics",
    description: "Handcrafted ceramic products",
    image: "https://picsum.photos/400/300?random=2",
  },
  {
    name: "Wooden Crafts",
    slug: "wooden-crafts",
    description: "Beautiful woodwork",
    image: "https://picsum.photos/400/300?random=3",
  },
  {
    name: "Paintings",
    slug: "paintings",
    description: "Handmade paintings",
    image: "https://picsum.photos/400/300?random=4",
  },
  {
    name: "Home Decor",
    slug: "home-decor",
    description: "Decorative handmade products",
    image: "https://picsum.photos/400/300?random=5",
  },
  {
    name: "Textiles",
    slug: "textiles",
    description: "Handwoven textiles",
    image: "https://picsum.photos/400/300?random=6",
  },
  {
    name: "Candles",
    slug: "candles",
    description: "Handmade scented candles",
    image: "https://picsum.photos/400/300?random=7",
  },
  {
    name: "Bamboo Crafts",
    slug: "bamboo-crafts",
    description: "Eco-friendly bamboo products",
    image: "https://picsum.photos/400/300?random=8",
  },
  {
    name: "Terracotta Art",
    slug: "terracotta-art",
    description: "Traditional terracotta products",
    image: "https://picsum.photos/400/300?random=9",
  },
  {
    name: "Crochet Products",
    slug: "crochet-products",
    description: "Handmade crochet creations",
    image: "https://picsum.photos/400/300?random=10",
  },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Category.deleteMany({});
  await Category.insertMany(categories);

  console.log("Categories inserted successfully");

  process.exit();
})();