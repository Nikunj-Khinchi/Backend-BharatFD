const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema({
    question: String,
    answer: String
}, { _id: false });

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
        type: Map,
        of: translationSchema
    }
}, { timestamps: true });

module.exports = mongoose.model("FAQ", faqSchema);