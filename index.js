const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Create an array in memory to store the scores
let scores = [];

// Get scores
apiRouter.get('/scores', (_req, res) => {
    res.send(scores);
});

// Submit a new score
apiRouter.post('/scores', async (req, res) => {
    const score = req.body;
    await DB.addScore(score);
    res.send(score);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

