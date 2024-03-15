const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
