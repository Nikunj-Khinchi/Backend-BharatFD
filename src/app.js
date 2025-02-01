const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const faqRoutes = require("./routes/faq.routes");
const { mongoose } = require("mongoose");
const redisClient = require("./config/redis");
const requestLogger = require("./middlewares/requestLoggerMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger)

app.use("/api/faqs", faqRoutes);
app.get("/api/healthcheck", async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();
        await redisClient.ping();

        res.status(200).json({
            message: {
                mongo: "Database is connected",
                redis: "Redis is connected",
                server: "Server is running"
            }
        });
    } catch (error) {
        logger.error(`Error connecting to services: ${error.message}`);
        res.status(500).json({
            message: {
                mongo: mongoose.connection.readyState === 1 ? "Database is connected" : "Database is not connected",
                redis: redisClient.status === 'ready' ? "Redis is connected" : "Redis is not connected",
                server: "Server is running"
            }
        });
    }
});

app.use(errorHandler);

module.exports = app;
