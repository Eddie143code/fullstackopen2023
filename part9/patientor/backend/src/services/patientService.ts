import { NoIdPatient, Patient, NonSensitivePatient } from "../types";
import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";
import data from "../../data/patients";

export const getPatients = (): Array<NonSensitivePatient> => {
  const p = patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
  return p;
};

export const getSinglePatient = (patient: any): Patient | undefined => {
  const { id } = patient;
  let singlePatient: Patient | undefined = data.find((p) => p.id === id);

  return singlePatient;
};

export const addPatient = (patient: NoIdPatient): Patient => {
  const np: Patient | any = {
    id: uuid(),
    ...patient,
    entries: [],
  };
  data.push(np);
  return np;
};
