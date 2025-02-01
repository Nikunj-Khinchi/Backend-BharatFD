// src/repositories/faq.repository.js
const FAQ = require("../models/faq.model");

class FaqRepository {
    async create(data) {
        return await FAQ.create(data);
    }

    async findById(id) {
        return await FAQ.findById(id);
    }

    async findAll() {
        return await FAQ.find();
    }

    async update(id, data) {
        return await FAQ.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await FAQ.findByIdAndDelete(id);
    }
}

module.exports = new FaqRepository();
