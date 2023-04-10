import { HealthCheckEntry } from "../../types";

export interface HealthCheckProps {
  entry: HealthCheckEntry;
}

const HealthCheck = ({ entry }: HealthCheckProps) => {
  return (
    <div>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>{entry.healthCheckRating}</p>
    </div>
  );
};

export default HealthCheck;
