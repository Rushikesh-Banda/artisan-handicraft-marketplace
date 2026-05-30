const mongoose = require("mongoose");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const User = require("./models/User");

const Category = require("./models/Category");

const Product = require("./models/Product");

const Artisan = require("./models/Artisan");


dotenv.config();

connectDB();


// ============================================
// HANDICRAFT IMAGES ONLY
// ============================================

const images = [

  "https://images.unsplash.com/photo-1610701596007-11502861dcfa",

  "https://images.unsplash.com/photo-1517705008128-361805f42e86",

  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",

  "https://images.unsplash.com/photo-1459908676235-d5f02a50184b",

  "https://images.unsplash.com/photo-1503602642458-232111445657",

  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",

  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",

  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",

  "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9",

  "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
];


// ============================================
// ARTISAN HANDICRAFT PRODUCTS
// ============================================

const productNames = [

  "Handmade Clay Pot",

  "Traditional Wooden Carving",

  "Handwoven Bamboo Basket",

  "Terracotta Vase",

  "Handcrafted Wall Hanging",

  "Artisan Ceramic Bowl",

  "Wooden Tribal Mask",

  "Handmade Jute Bag",

  "Traditional Brass Lamp",

  "Handwoven Carpet",

  "Decorative Clay Diya",

  "Handmade Dream Catcher",

  "Wooden Elephant Sculpture",

  "Macrame Wall Decor",

  "Traditional Pottery Set",

  "Handcrafted Bamboo Lamp",

  "Artisan Coffee Mug",

  "Handmade Candle Holder",

  "Ethnic Wooden Tray",

  "Decorative Clay Planter",

  "Traditional Handmade Painting",

  "Handwoven Table Mat",

  "Wooden Jewelry Box",

  "Handcrafted Incense Holder",

  "Terracotta Wall Plate",

  "Traditional Handloom Cloth",

  "Handmade Crochet Basket",

  "Decorative Bamboo Craft",

  "Wooden Handicraft Frame",

  "Artisan Clay Tea Set",

  "Handmade Tribal Art",

  "Traditional Bamboo Basket",

  "Handcrafted Pottery Vase",

  "Wooden Decorative Cart",

  "Ethnic Handmade Decor",

  "Handwoven Storage Basket",

  "Traditional Clay Sculpture",

  "Artisan Handmade Mirror",

  "Decorative Wooden Craft",

  "Handmade Rustic Pot",

  "Traditional Tribal Painting",

  "Handmade Bamboo Organizer",

  "Clay Decorative Bowl",

  "Wooden Peacock Craft",

  "Handmade Artisan Plate",

  "Traditional Folk Art",

  "Decorative Pottery Lamp",

  "Handwoven Handmade Mat",

  "Ethnic Bamboo Basket",

  "Handcrafted Wooden Box",
];


// ============================================
// SEED DATABASE
// ============================================

const seedData = async () => {

  try {

    console.log("Deleting old data...");


    await Product.deleteMany();

    await Category.deleteMany();

    await Artisan.deleteMany();

    await User.deleteMany();


    // ========================================
    // CREATE ARTISAN USER
    // ========================================

    const artisanUser =
      await User.create({

        name: "Rushikesh Artisan",

        email: "artisan@gmail.com",

        password: "123456",

        role: "artisan",
      });


    // ========================================
    // CREATE ARTISAN PROFILE
    // ========================================

    await Artisan.create({

      user: artisanUser._id,

      bio: "Professional Handmade Artisan",

      storeName: "Rushi Handicrafts",

      portfolio: [
        images[0],
        images[1],
      ],
    });


    // ========================================
    // CREATE CATEGORIES
    // ========================================

    const categoryNames = [

      "Pottery",

      "Wood Crafts",

      "Bamboo Crafts",

      "Handmade Decor",

      "Traditional Art",
    ];


    const createdCategories = [];


    for (const name of categoryNames) {

      const category =
        await Category.create({

          name,

          slug: name
            .toLowerCase()
            .replace(/\s+/g, "-"),

          description:
            `${name} artisan category`,
        });

      createdCategories.push(category);
    }


    // ========================================
    // CREATE PRODUCTS
    // ========================================

    const products = [];


    for (let i = 1; i <= 500; i++) {

      const randomCategory =

        createdCategories[
          Math.floor(
            Math.random() *
            createdCategories.length
          )
        ];


      const randomImage =

        images[
          Math.floor(
            Math.random() *
            images.length
          )
        ];


      const randomName =

        productNames[
          Math.floor(
            Math.random() *
            productNames.length
          )
        ];


      products.push({

        user: artisanUser._id,

        title:
          `${randomName} ${i}`,

        slug:
          `${randomName}-${i}`
            .toLowerCase()
            .replace(/\s+/g, "-"),

        description:
          "Beautiful handmade artisan handicraft product created with traditional craftsmanship and creativity.",

        price:
          Math.floor(
            Math.random() * 500
          ) + 100,

        category:
          randomCategory._id,

        countInStock:
          Math.floor(
            Math.random() * 20
          ) + 1,

        image: randomImage,

        rating:
          Number(
            (Math.random() * 5)
            .toFixed(1)
          ),

        numReviews:
          Math.floor(
            Math.random() * 200
          ),
      });
    }


    await Product.insertMany(products);


    console.log(
      "500 Artisan handicraft products created successfully!"
    );


    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);
  }
};


seedData();