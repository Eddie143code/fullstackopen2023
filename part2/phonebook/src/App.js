import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import contactService from "./services/Contacts";

const App = () => {
  const [persons, setPersons] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterList, setFilterList] = useState(persons ? persons : "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const nameChange = (e) => {
    setNewName(e.target.value);
  };

  const phoneChange = (e) => {
    setNewNumber(e.target.value);
  };

  const filterChange = (e) => {
    const filterTest = e.target.value.toLowerCase();
    const filterWordTest = persons.filter((person) => {
      return person.name.toLowerCase().includes(filterTest);
    });
    setFilterList(filterWordTest);
  };

  const addContact = (e) => {
    e.preventDefault();
    const newContact = { name: newName, number: newNumber };

    const testName = persons.find((person) => {
      if (person.name === newName) {
        return person.name;
      }
      return null;
    });

    const testNumber = persons.find((person) => {
      if (person.number === newNumber) {
        return person.number;
      }
      return null;
    });

    if (testName) {
      if (
        window.confirm(
          `${newName} is already in phonebook, replace the old number with a new one?`
        )
      ) {
        const newId = persons.find((person) => person.name === testName.name);

        contactService
          .update(newId, newContact)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== newId.id ? person : response
              )
            );
            setFilterList(
              persons.map((person) =>
                person.id !== newId.id ? person : response
              )
            );
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newContact.name} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          });
      }
    } else if (testNumber) {
      return alert(`${newNumber} already in phonebook`);
    } else {
      setNewName("");
      setNewNumber("");
      contactService
        .create(newContact)
        .then(() => setPersons([...persons, newContact]))
        .then(() => setFilterList([...persons, newContact]))
        .then(() => {
          setSuccessMessage("Added " + newContact.name);
          setTimeout(() => {
            setSuccessMessage("");
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error.message);
          console.log(error.response.data.error.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        });
    }
  };

  const deleteContacts = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactService.deleteContact(id).then((response) => {
        const filtered = persons.filter((person) => person.id != id);
        console.log(filtered);
        setPersons(filtered);
        setFilterList(filtered);
      });
    }
  };

  useEffect(() => {
    contactService.getAll().then((response) => {
      setPersons(response);
      setFilterList(response);
    });
    console.log("render");
  }, [successMessage]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChange={filterChange} />
      {successMessage && <Notification notification={successMessage} />}
      {errorMessage && <Notification notification={errorMessage} />}

      <h2>add a new</h2>

      <PersonForm
        addContact={addContact}
        nameChange={nameChange}
        phoneChange={phoneChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterList={filterList}
        deleteContacts={deleteContacts}
      />
    </div>
  );
};

export default App;
