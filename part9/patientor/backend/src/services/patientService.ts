import { NoSsnPatient, NoIdPatient, Patient } from "../types";
import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";
import data from "../../data/patients";

export const getPatients = (): Array<NoSsnPatient> => {
  const p = patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
  return p;
};

export const addPatient = (p: NoIdPatient): Patient => {
  const { name, dateOfBirth, gender, ssn, occupation } = p;
  const np: Patient = {
    id: uuid(),
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
  };
  data.push(np);
  return np;
};
