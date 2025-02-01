const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: {
        success: false,
        message: "Too many requests from this IP, please try again later."
    },
    headers: true, 
    keyGenerator: (req) => {
        return req.headers["x-forwarded-for"] || req.ip;
    }
});

module.exports = limiter;
