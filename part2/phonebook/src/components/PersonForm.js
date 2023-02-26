import React from "react";

const PersonForm = ({
  addContact,
  nameChange,
  phoneChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name: <input onChange={nameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={phoneChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
