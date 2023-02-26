const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.filter((person) => person.id === id);

  if (!person) {
    return res.status(204).end();
  }
  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }
  const nameTest = persons.find((person) => person.name === body.name);

  if (nameTest) {
    return res.status(400).json({
      error: "contact already exists",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons.concat(person);

  res.json(person);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const text = `<div>Phonebook has info for 2 people</div><br><div>${date}</div>`;

  res.end(text);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
