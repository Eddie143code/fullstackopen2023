import express from "express";
import {
  getPatients,
  addPatient,
  getSinglePatient,
} from "../services/patientService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatients());
});

router.get("/:id", (req, res) => {
  const id = req.params;
  res.send(getSinglePatient(id));
});

router.post("/", (req, res) => {
  const p = toNewPatient(req.body);
  res.send(addPatient(p));
});

export default router;
