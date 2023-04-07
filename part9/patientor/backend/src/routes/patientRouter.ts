import express from "express";
import { getPatients, addPatient } from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatients());
});

router.post("/", (req, res) => {
  const p = req.body;
  res.send(addPatient(p));
});

export default router;
