const Vina = require("../Models/Vina")
const Proizvodaci = require("../Models/Proizvodaci")


async function getAllVina(req, res) {
  try {
    const result = await Vina.find();
    res.json(result);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getVinoById(req, res) {
  try {
    const vino = await Vina.findById(req.params.id);
    res.json(vino);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function createVino(req, res) {
  try {
    console.log(req.body);
    const vino = Vina(req.body);
    await vino.save();
    res.status(201).send("Uspijesno dodano");
  } catch (error) {
    res.status(404).send(error);
  }
}

async function editVino(req, res) {
  try {
    //console.log(req.body.ime);
    console.log(req.params.id);
    const {ime, cijena, postotak, vrsta, stil, opis, proizvodaci} = req.body;
    console.log({ime, cijena, postotak, vrsta, stil, opis, proizvodaci});
    const vino = await Vina.findByIdAndUpdate(req.params.id ,{ime: ime, cijena: cijena, 
                          postotak: postotak, vrsta: vrsta, stil: stil, 
                          opis: opis, proizvodaci: proizvodaci});
    res.json(vino);
  } catch (error) {
    res.status(404).send(error);
  }
}


async function deleteVino(req, res) {
  try {
    console.log(req.params.id);
    Vina.findByIdAndDelete(req.params.id, (err) =>{
      if(err){
          console.log(err);
      }
   });
    res.status(201).send("Uspijesno izbrisano");
  } catch (error) {
    res.status(404).send(error);
  }
}

/*
async function getVinoByProizvodac(req, res) {
  try {
    const proizvodaci = await Proizvodaci.find({proizvodaci: req.params.id});
    res.json(proizvodaci);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getSongsBySubId(req, res) {
  try {
    const songs = await Songs.find({subgenre: req.params.id});
    res.json(songs);
  } catch (error) {
    res.status(404).send(error);
  }
}
*/

module.exports = { getAllVina, createVino, editVino, deleteVino, getVinoById };
