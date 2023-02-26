import React from "react";

const Persons = ({ filterList, deleteContacts }) => {
  return (
    <>
      {filterList &&
        filterList.map((person) => (
          <div key={person.name}>
            <p>
              {person.name} {person.number}{" "}
              <button
                id={person.id}
                onClick={() => deleteContacts(person.id, person.name)}
              >
                delete
              </button>
            </p>
          </div>
        ))}
    </>
  );
};

export default Persons;
