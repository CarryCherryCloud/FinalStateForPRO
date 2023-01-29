const axios = require('axios');

async function initializeGame() {
    return await axios.post("/initialize");
}

module.exports = { initializeGame }
