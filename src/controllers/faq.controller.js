// src/controllers/faq.controller.js
const faqService = require("../services/faq.service");
const logger = require("../utils/logger");
const WriteResponse = require("../utils/response");

class FaqController {
    async create(req, res) {
        try {
            const faq = await faqService.createFAQ(req.body);
            logger.info(`FAQ created: ${faq._id}`);
            return WriteResponse(res, 201, "FAQ created Succesfully", faq);
        } catch (error) {
            logger.error(`Error creating FAQ: ${error}`);
            return WriteResponse(res, 500, "Internal Server Error");
        }
    }

    async getAll(req, res) {
        try {
            const lang = req.query.lang || "en";
            const faqs = await faqService.getFAQs(lang);
            logger.info("FAQs fetched successfully");
            return WriteResponse(res, 200, "FAQs fetched successfully", faqs);
        } catch (error) {
            logger.error(`Error fetching FAQs: ${error}`);
            return WriteResponse(res, 500, "Internal Server Error");
        }
    }

    async update(req, res) {
        try {
            const faq = await faqService.updateFAQ(req.params.id, req.body);
            logger.info(`FAQ updated: ${faq._id}`);
            return WriteResponse(res, 200, "FAQ updated successfully", faq);
        } catch (error) {
            logger.error(`Error updating FAQ: ${error}`);
            return WriteResponse(res, 500, "Internal Server Error");
        }
    }

    async delete (req, res) {
        try {
            await faqService.deleteFAQ(req.params.id);
            logger.info(`FAQ deleted: ${req.params.id}`);
            return WriteResponse(res, 200, "FAQ deleted successfully");
        } catch (error) {
            logger.error(`Error deleting FAQ: ${error}`);
            return WriteResponse(res, 500, "Internal Server Error");
        }
    }
}

module.exports = new FaqController();
