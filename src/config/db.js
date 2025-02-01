const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('./envConfig');

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        logger.info('Connected to MongoDB');
    } catch (err) {
        logger.error(`Error connecting to MongoDB: ${err}`);
        process.exit(1); // Exit the application on database connection failure
    }
};

module.exports = connectDB;
