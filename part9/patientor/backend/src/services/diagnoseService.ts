import diagnoseData from "../../data/diagnoses";
import { Diagnose } from "../types";

export const getDiagnoses = (): Array<Diagnose> => {
  return diagnoseData;
};
