import React, { useState } from "react";
import { OccupationalHealthcareEntry } from "../../types";
import diagnosisService from "../../services/diagnosis";

export interface OccupationalProps {
  entry: OccupationalHealthcareEntry;
}
const OccupationalHealthcare = ({ entry }: OccupationalProps) => {
  const [diag, setDiag] = useState<any>("");

  if (entry.diagnosisCodes) {
    diagnosisService.getDiagnosis(entry.diagnosisCodes).then((z) => setDiag(z));
  }
  return (
    <div>
      <button onClick={() => console.log(diag)}></button>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>{entry.employerName}</p>
      <ul>
        {diag &&
          diag.map((d: any) => {
            return (
              <>
                <h4>{d.name}</h4> <li>{d.code}</li>
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default OccupationalHealthcare;
