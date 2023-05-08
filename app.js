const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Question = require('./models/question');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Replace 'your_mongodb_connection_string' with your actual MongoDB connection string
const uri = "mongodb+srv://jscherrerdelllano1:c1h2iPCXoSoLLn8n@cluster0.5hxugdz.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the MongoDB database");
});

// Define the schema for questions and answers
const qaSchema = new mongoose.Schema({
  name: String,
  question: String,
  answer: String,
});

const QuestionAnswer = mongoose.model("QuestionAnswer", qaSchema);

// API endpoint to get all questions and answers
app.get('/api/questions', async (req, res) => {
    try {
      const questionsAndAnswers = await Question.find({});
      res.json(questionsAndAnswers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching questions and answers" });
    }
  });

// API endpoint to add a new question
app.post("/api/questions", (req, res) => {
  const newQA = new QuestionAnswer({
    name: req.body.name,
    question: req.body.question,
    answer: "", // Initially, the answer will be empty
  });

  newQA.save((err, savedQA) => {
    if (err) {
      res.status(500).send("Error saving the question");
    } else {
      res.status(201).json(savedQA);
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
