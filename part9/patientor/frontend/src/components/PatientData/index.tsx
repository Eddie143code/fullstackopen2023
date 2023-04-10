import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient, Entry } from "../../types";

import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";

export interface EntryProps {
  entry: Entry;
}

const EntryData = ({ entry }: EntryProps) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return null; // or any other valid JSX element
  }
};

const PatientData = () => {
  const { id } = useParams();
  const [data, setData] = useState<Patient | undefined>();
  console.log(typeof id);

  useEffect(() => {
    patientService.getSingle(id).then((patient) => setData(patient));
  }, []);

  return (
    <div>
      <button onClick={() => console.log(data)}>log</button>
      {data && (
        <div>
          <h3>{data.name}</h3>
          <p>ssn: {data.ssn}</p>
          <p>occupation: {data.occupation}</p>
          <h4>entries</h4>
          {data.entries.map((entry) => (
            <EntryData key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientData;
