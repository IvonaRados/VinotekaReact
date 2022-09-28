const express = require("express");
const router = express.Router();
const ProizvodaciController = require("./controllers/ProizvodaciC");
const VinaController = require("./controllers/VinaC");
const UserController = require("./controllers/User");
const { verifyJwt} = require('./jwt');


router.get("/proizvodaci", verifyJwt, ProizvodaciController.getAllProizvodaci);
router.get("/vina",verifyJwt, VinaController.getAllVina);
router.get("/vina/:id", verifyJwt, VinaController.getVinoById);
router.get("/proizvodaci/:id", verifyJwt, ProizvodaciController.getProizvodacById);
router.post("/proizvodaci/addProizvodac", ProizvodaciController.createProizvodac);
router.post("/vino/addVino", VinaController.createVino);
router.put("/vino/editVino/:id", VinaController.editVino);
router.delete("/vino/deleteVino/:id", VinaController.deleteVino);
router.put("/proizvodac/editproizvodac/:id", ProizvodaciController.editProizvodac);
router.delete("/proizvodac/deleteproizvodac/:id", ProizvodaciController.deleteProizvodac);
router.post("/login", UserController.login);
router.post("/register", UserController.register);


module.exports = router;
