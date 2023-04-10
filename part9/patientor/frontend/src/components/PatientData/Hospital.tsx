import { HospitalEntry } from "../../types";
import React, { useState } from "react";
import { OccupationalHealthcareEntry } from "../../types";
import diagnosisService from "../../services/diagnosis";

export interface HospitalProps {
  entry: HospitalEntry;
}

const Hospital = ({ entry }: HospitalProps) => {
  const [diag, setDiag] = useState<any>("");

  if (entry.diagnosisCodes) {
    diagnosisService.getDiagnosis(entry.diagnosisCodes).then((z) => setDiag(z));
  }
  return (
    <div>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>{entry.discharge.criteria}</p>
      <ul>
        {diag &&
          diag.map((d: any) => {
            return (
              <>
                <li key={d.name}>
                  <h4>{d.name}</h4>
                </li>{" "}
                <p>{d.code}</p>
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default Hospital;
