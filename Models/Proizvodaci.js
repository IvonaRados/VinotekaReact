const mongoose = require("mongoose");

const ProizvodaciScheme = new mongoose.Schema({
    ime: String,
    godina_osnivanja: String,
    drzava: String,
    opis: String,
});

module.exports = mongoose.model("Proizvodaci", ProizvodaciScheme);

