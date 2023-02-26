import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState("");

  useEffect(() => {}, []);
  return (
    <div>
      find countries <input />
    </div>
  );
}

export default App;
