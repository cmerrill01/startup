const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");
const userCollection = db.collection("user");
const scoreCollection = db.collection("score");

async function testConnection() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("startup").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
}
testConnection();

function addScore(score) {
  scoreCollection.insertOne(score);
}

function getScores() {
  const query = { username: { $not: { $eq: "unknown_user" } } }
  const options = { sort: { score: -1 } };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {
  addScore,
  getScores,
};