import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getDiagnosis = async (codes: String[]) => {
  const allDiag: any = await axios.get(`${apiBaseUrl}/diagnoses`);

  const diagnoses: any = [];

  codes.forEach((code) => {
    allDiag.data.forEach((element: any) => {
      if (element.code === code) {
        diagnoses.push(element);
      }
    });
  });

  return diagnoses;
};

export default {
  getDiagnosis,
};
