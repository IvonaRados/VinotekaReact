const Proizvodaci = require("../Models/Proizvodaci")


async function getAllProizvodaci(req, res) {
  try {
    const result = await Proizvodaci.find();
    res.json(result);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getProizvodacById(req, res) {
  try {
    const proizvodac = await Proizvodaci.findById(req.params.id);
    res.json(proizvodac);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function createProizvodac(req, res) {
  try {
    console.log(req.body);
    const proizvodac = Proizvodaci(req.body);
    await proizvodac.save();
    res.status(201).send("Uspijesno dodano");
  } catch (error) {
    res.status(404).send(error);
  }
}

async function editProizvodac(req, res) {
    try {
      const {ime, godina_osnivanja, drzava, opis} = req.body;
      console.log({ime, godina_osnivanja, drzava, opis});
      const proizvodac = await Proizvodaci.findByIdAndUpdate(req.params.id ,{ime: ime, godina_osnivanja: godina_osnivanja, drzava: drzava, opis: opis});
      res.json(proizvodac);
    } catch (error) {
      res.status(404).send(error);
    }
}


async function deleteProizvodac(req, res) {
  try {
    console.log(req.params.id);
    Proizvodaci.findByIdAndDelete(req.params.id, (err) =>{
      if(err){
          console.log(err);
      }
   });
    res.status(201).send("Uspijesno izbrisano");
  } catch (error) {
    res.status(404).send(error);
  }
}


module.exports = { getAllProizvodaci, getProizvodacById, createProizvodac, editProizvodac, deleteProizvodac };
