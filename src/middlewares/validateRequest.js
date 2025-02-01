// src/middlewares/validateRequest.js
const { body, validationResult } = require("express-validator");

const faqValidation = [
    body("question")
        .trim()
        .notEmpty()
        .withMessage("Question is required")
        .isLength({ min: 5 })
        .withMessage("Question must be at least 5 characters long"),

    body("answer")
        .trim()
        .notEmpty()
        .withMessage("Answer is required")
        .isLength({ min: 10 })
        .withMessage("Answer must be at least 10 characters long"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }
        next();
    }
];

module.exports = faqValidation;
