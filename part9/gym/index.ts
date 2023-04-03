import express from "express";
const app = express();
import bmi from "./bmiCalculator";
import calcEx from "./exerciseCalculator";

app.use(express.json());

app.get("/bmi", (req, res) => {
  console.log(req.query);
  if (!req.query.height || !req.query.weight) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const result = bmi(height, weight);

  res.status(200).send(result);
  //res.send(req.query);
});

app.post("/exCalc", (req, res) => {
  const { daily_exercises, target } = req.body;
  const result = calcEx(daily_exercises, target);

  res.status(200).send(result);
});

app.get("/hello", (_req, res) => {
  res.status(200).send("Hello Full Stack!");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
