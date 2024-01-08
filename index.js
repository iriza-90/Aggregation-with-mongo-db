const express = require('express');
const mongoose = require('mongoose');
const mongodb =require('mongodb');

const app = express();

const PORT = 3500;

app.get('/', (req, res) => {
  res.send("Logging results");
});

const url = 'mongodb://127.0.0.1:27017/Score';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  const scoreSchema = new mongoose.Schema({
    score1: Number,
    score2: Number,
    score3: Number
  }, { _id: false });

  const ScoreModel = mongoose.model('Score', scoreSchema);

  ScoreModel.find().sort({ score1: -1 }).limit(2).exec((err, scores) => {
    if (err) {
      console.error(err);
    } else {
      console.log(scores);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
