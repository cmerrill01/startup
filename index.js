const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Create a new user account
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: "Existing user" });
    } else {
        const user = await DB.createUser(req.body.username, req.body.email, req.body.password);
        setAuthCookie(res, user.token);
        res.send({ id: user._id, });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUserByUsername(req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id});
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

// Get scores
secureApiRouter.get('/scores', async (_req, res) => {
    const scores = await DB.getScores();
    res.send(scores);
});

// Submit a new score
secureApiRouter.post('/scores', async (req, res) => {
    const score = req.body;
    await DB.addScore(score);
    res.send(score);
});

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public'});
});

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

