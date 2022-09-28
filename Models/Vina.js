const mongoose = require("mongoose");

const VinaSchema = new mongoose.Schema({
  ime: String,
  cijena: String,
  postotak: String,
  vrsta: String,
  stil: String,
  opis: String,
  proizvodaci: {
    type: String,
    ref: "Proizvodaci",
  },
});

module.exports = mongoose.model("Vina", VinaSchema);