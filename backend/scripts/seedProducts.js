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

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log('Existing products cleared');

    const sampleProducts = [
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Handcrafted Ceramic Vase',
        slug: 'handcrafted-ceramic-vase',
        description: 'A beautifully handcrafted ceramic vase, perfect for home decor.',
        price: 45.0,
        discountPrice: 0,
        category: new mongoose.Types.ObjectId(),
        countInStock: 10,
        image: 'https://via.placeholder.com/400x300?text=Ceramic+Vase',
        images: [],
        rating: 4.5,
        numReviews: 2,
        isFeatured: true,
        isActive: true,
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Woven Tapestry',
        slug: 'woven-tapestry',
        description: 'Detailed woven tapestry made from natural fibers.',
        price: 120.0,
        discountPrice: 0,
        category: new mongoose.Types.ObjectId(),
        countInStock: 5,
        image: 'https://via.placeholder.com/400x300?text=Woven+Tapestry',
        images: [],
        rating: 4.8,
        numReviews: 5,
        isFeatured: false,
        isActive: true,
      },
      {
        user: new mongoose.Types.ObjectId(),
        title: 'Silver Necklace',
        slug: 'silver-necklace',
        description: 'Elegant silver necklace with intricate design.',
        price: 85.0,
        discountPrice: 0,
        category: new mongoose.Types.ObjectId(),
        countInStock: 8,
        image: 'https://via.placeholder.com/400x300?text=Silver+Necklace',
        images: [],
        rating: 4.2,
        numReviews: 3,
        isFeatured: false,
        isActive: true,
      },
    ];

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
