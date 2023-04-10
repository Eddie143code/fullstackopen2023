import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { PatientId, Patient } from "../../types";

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
        </div>
      )}
    </div>
  );
};

export default PatientData;
