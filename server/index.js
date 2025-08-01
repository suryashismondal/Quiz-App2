
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const FormData = require('./models/FormData');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.post('/submit-score', async (req, res) => {
  const { score, total } = req.body;
  const Score = new FormData({ score, total });
  try {
    const newScore = await Score.save();
    res.status(201).json(newScore);
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: 'Failed to save score', error });
  }
});

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});

