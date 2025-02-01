// src/routes/faq.routes.js
const express = require("express");
const FaqController = require("../controllers/faq.controller");
const faqValidation = require("../middlewares/validateRequest");
const rateLimiter = require("../middlewares/rateLimiter");
const router = express.Router();

router.use(rateLimiter);

router.post("/", faqValidation, FaqController.create);

router.get("/", FaqController.getAll);

router.put("/:id", faqValidation, FaqController.update);

router.delete("/:id", FaqController.delete);

module.exports = router;
