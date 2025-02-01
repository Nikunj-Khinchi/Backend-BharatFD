const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const FAQ = require("../models/faq.model");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// Setup an in-memory MongoDB before running tests
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.disconnect();
    await mongoose.connect(mongoUri);
});

// Cleanup database after each test
afterEach(async () => {
    await FAQ.deleteMany();
});

// Close connection after tests
afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe("FAQ API Tests", () => {

    it("should create a new FAQ", async () => {
        const res = await request(app)
            .post("/api/faqs")
            .send({
                question: "What is Node.js?",
                answer: "Node.js is a JavaScript runtime built on Chrome's V8 engine."
            })
            .expect(201);

        expect(res.body.data).toHaveProperty("_id");
        expect(res.body.data.question).toBe("What is Node.js?");
        expect(res.body.data.answer).toBe("Node.js is a JavaScript runtime built on Chrome's V8 engine.");
    });

    it("should return all FAQs", async () => {
        await FAQ.create({ question: "What is Express.js?", answer: "Express.js is a minimal web framework for Node.js." });

        const res = await request(app).get("/api/faqs").expect(200);
        
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0]).toHaveProperty("question");
        expect(res.body.data[0].question).toBe("What is Express.js?");
    });

    it("should return translated answer when lang is specified", async () => {
        await FAQ.create({
            question: "What is MongoDB?",
            answer: "MongoDB is a NoSQL database.",
            translations: { es: { question: "¿Qué es MongoDB?", answer: "MongoDB es una base de datos NoSQL." } }
        });

        const res = await request(app).get(`/api/faqs?lang=es`).expect(200);

        expect(res.body.data[0].question).toBe("¿Qué es MongoDB?");
        expect(res.body.data[0].answer).toBe("MongoDB es una base de datos NoSQL.");
    });

    it("should return 400 if question or answer is missing", async () => {
        const res = await request(app)
            .post("/api/faqs")
            .send({ question: "What is Node.js?" }) // answer is missing
            .expect(400);

        console.log("res", res.body);
        

        expect(res.body.success).toBe(false);
        expect(res.body.errors[0].message).toBe("Answer is required");
    });

    it("should update an FAQ", async () => {
        const faq = await FAQ.create({
            question: "What is Jest?",
            answer: "Jest is a JavaScript testing framework."
        });

        const res = await request(app)
            .put(`/api/faqs/${faq._id}`)
            .send({ question: "What is Jest?", answer: "Jest is a testing framework." })
            .expect(200);

        expect(res.body.data.answer).toBe("Jest is a testing framework.");
    });

    it("should delete an FAQ", async () => {
        const faq = await FAQ.create({
            question: "What is Jest?",
            answer: "Jest is a JavaScript testing framework."
        });

        const res = await request(app).delete(`/api/faqs/${faq._id}`).expect(200);
        
        expect(res.body.message).toBe("FAQ deleted successfully");
        const check = await FAQ.findById(faq._id);
        expect(check).toBeNull();
    });

});