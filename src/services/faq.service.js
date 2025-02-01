const faqRepository = require("../repositories/faq.repository");
const translateText = require("../utils/googleTranslate");
const redisClient = require("../config/redis");

class FaqService {
    async createFAQ(data) {
        const languages = ['hi', 'gu', 'bn', 'mr']; // Hindi, Gujarati, Bengali, Marathi
        const translations = await this.translateFAQ(data, languages);

        const faqData = {
            question: data.question,
            answer: data.answer,
            translations
        };

        const faq = await faqRepository.create(faqData);
        await this.clearCache();
        return faq;
    }

    async getFAQs(lang) {
        const cacheKey = `faqs:${lang}`;
        let cachedData = await redisClient.get(cacheKey);
        if (cachedData) return JSON.parse(cachedData);

        let faqs = await faqRepository.findAll();
        if (lang && lang !== "en") {
            faqs = await Promise.all(
                faqs.map(async (faq) => {
                    if (!faq.translations[lang]) {
                        faq.translations[lang] = {
                            question: await translateText(faq.question, lang),
                            answer: await translateText(faq.answer, lang)
                        };
                    }
                    return {
                        question: faq.translations[lang].question,
                        answer: faq.translations[lang].answer
                    };
                })
            );
        }

        await redisClient.set(cacheKey, JSON.stringify(faqs), "EX", 3600);
        return faqs;
    }

    async updateFAQ(id, data) {
        const languages = ['hi', 'gu', 'bn', 'mr']; // Hindi, Gujarati, Bengali, Marathi
        const translations = await this.translateFAQ(data, languages);

        const faqData = {
            question: data.question,
            answer: data.answer,
            translations
        };

        const faq = await faqRepository.update(id, faqData, { new: true });
        await this.clearCache();
        return faq;
    }

    async deleteFAQ(id) {
        await faqRepository.delete(id);
        await this.clearCache();
        return { message: "FAQ deleted successfully" };
    }

    async translateFAQ(data, languages) {
        const translations = {};
        await Promise.all(languages.map(async (lang) => {
            translations[lang] = {
                question: await translateText(data.question, lang),
                answer: await translateText(data.answer, lang)
            };
        }));
        return translations;
    }

    async clearCache() {
        await redisClient.flushall();
    }
}

module.exports = new FaqService();



// const faqRepository = require("../repositories/faq.repository");
// const translateText = require("../utils/googleTranslate");
// const redisClient = require("../config/redis");

// class FaqService {
//     constructor() {
//         this.languages = ["hi", "gu", "bn", "mr"];
//     }

//     async createFAQ(data) {
//         const translations = await this.getTranslatedAnswers(data.answer);

//         const faqData = {
//             question: data.question,
//             answer: data.answer,
//             translations
//         };

//         const faq = await faqRepository.create(faqData);
//         return faq;
//     }

//     async getFAQs(lang = "en") {
//         const cacheKey = `faqs:${lang}`;
//         let cachedData = await redisClient.get(cacheKey);
//         if (cachedData) return JSON.parse(cachedData);

//         let faqs = await faqRepository.findAll();

//         if (lang !== "en") {
//             faqs = faqs.map(faq => ({
//                 _id: faq._id,
//                 question: faq.question,
//                 answer: faq.translations[lang] || faq.answer, // Use translation or fallback to English
//                 createdAt: faq.createdAt
//             }));
//         }

//         await redisClient.set(cacheKey, JSON.stringify(faqs), "EX", 3600);
//         return faqs;
//     }

//     async updateFAQ(id, data) {
//         const translations = await this.getTranslatedAnswers(data.answer);

//         const faqData = {
//             question: data.question,
//             answer: data.answer,
//             translations
//         };

//         const faq = await faqRepository.findByIdAndUpdate(id, faqData, { new: true });
//         await redisClient.del(`faqs:*`); // Clear all FAQ caches to keep data consistent
//         return faq;
//     }

//     async deleteFAQ(id) {
//         await faqRepository.findByIdAndDelete(id);
//         await redisClient.del(`faqs:*`); // Clear all FAQ caches
//         return { message: "FAQ deleted successfully" };
//     }

//     async getTranslatedAnswers(answer) {
//         const translations = {};
//         await Promise.all(
//             this.languages.map(async (lang) => {
//                 translations[lang] = await translateText(answer, lang);
//             })
//         );
//         return translations;
//     }
// }

// module.exports = new FaqService();
