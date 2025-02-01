// src/server.js
const app = require("./app");
const config = require("./config/envConfig");
const logger = require("./utils/logger");

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server running on port http://localhost:${PORT}`);
});
