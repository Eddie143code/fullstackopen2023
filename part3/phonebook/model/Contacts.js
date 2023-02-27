const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGO_URL;

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

console.log("connecting to ", url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true,
  },
  number: {
    type: String,
    minLength: 5,
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Persons", personSchema);
