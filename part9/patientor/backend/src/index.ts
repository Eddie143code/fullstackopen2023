import express from "express";
import diagnoseRouter from "./routes/diagnoseRouter";
import patientRouter from "./routes/patientRouter";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
