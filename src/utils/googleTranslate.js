// src/utils/googleTranslate.js
const translate = require("google-translate-api-x");

const translateText = async (text, targetLang) => {
    try {
        const res = await translate(text, { to: targetLang });
        return res.text; // The translated text
    } catch (error) {
        console.error("Translation Error:", error);
        return text; // Fallback to original text
    }
};

module.exports = translateText;
