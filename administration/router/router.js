let LoginController = require('../controllers/LoginController');
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let SponsorController = require('./../controllers/SponsorController');
let GrandprixController = require('./../controllers/GrandPrixControler');
let FournisseurController = require('./../controllers/FournisseurController');
// Routes
module.exports = function(app){

// Main Routes
    app.get('/', verifLogin, HomeController.Index);
    // Connexion
    app.get('/login', LoginController.Connexion);
    app.post('/login', LoginController.Authentification);
    app.get('/logout', LoginController.Logout);

// pilotes
    app.get('/pilotes', verifLogin,PiloteController.ListerPilote);
    app.get('/pilotes/ajoutPilote', verifLogin,PiloteController.AjoutPilote);
    app.post('/pilotes/ajoutPilote', verifLogin,PiloteController.AjoutInfoPilote);
    app.get('/pilotes/supprimer/:PILNUM',verifLogin, PiloteController.SupprimerPilote);
    app.get('/pilotes/modifier/:PILNUM', verifLogin, PiloteController.ModifierPilote);
    app.post('/pilotes/modifier/:PILNUM', verifLogin,PiloteController.ModifierInfoPilote);
    // circuits
    app.get('/circuits',verifLogin, CircuitController.ListerCircuit);
    app.get('/circuits/ajoutCircuit',verifLogin, CircuitController.AjoutCircuit);
    app.post('/circuits/ajoutCircuit', CircuitController.AjoutInfoCircuit);
    app.get('/circuits/supprimer/:CIRNUM',verifLogin,CircuitController.SupprimerCircuit);
    app.post('/circuits/modifier/:CIRNUM', verifLogin, CircuitController.ModifierInfoCircuit);
    app.get('/circuits/modifier/:CIRNUM', verifLogin,CircuitController.ModifierCircuit);


// Ecuries
    app.get('/ecuries',verifLogin, EcurieController.ListerEcurie);
    app.get('/ecuries/ajoutEcurie',verifLogin,EcurieController.AjoutEcurie);
    app.post('/ecuries/ajoutEcurie',verifLogin,EcurieController.AjoutInfoEcurie);
    app.get('/ecuries/supprimer/:ECUNUM',verifLogin,EcurieController.SupprimerEcurie);
    app.get('/ecuries/modifier/:ECUNUM',verifLogin,EcurieController.ModifierEcurie);
    app.post('/ecuries/modifier/:ECUNUM',verifLogin,EcurieController.ModifierInfoEcurie);


    //Résultats
    app.get('/resultats',verifLogin, ResultatController.ListerGP);
    app.post('/resultats',verifLogin, ResultatController.RedirectionSaisieResultat);
    app.get('/resultats/saisieResultats/:GPNUM',verifLogin, ResultatController.SaisieResultat);
    app.post('/resultats/saisieResultats/:GPNUM',verifLogin, ResultatController.SaisieInfoResultat);
    app.post('/resultats/supprimer',verifLogin, ResultatController.SupprimerLigneResultat);

    // Sponsors
    app.get('/sponsors',verifLogin, SponsorController.ListerSponsor);
    app.get('/sponsors/ajoutSponsor',verifLogin,SponsorController.AjoutSponsor);
    app.post('/sponsors/ajoutSponsor',verifLogin,SponsorController.AjoutInfoSponsor);
    app.get('/sponsors/supprimer/:SPONUM',verifLogin,SponsorController.SupprimerSponsor);
    app.get('/sponsors/modifier/:SPONUM',verifLogin,SponsorController.ModifierSponsor);
    app.post('/sponsors/modifier/:SPONUM',verifLogin,SponsorController.ModifierInfoSponsor);

    //grandprix
    app.get('/grandprix',verifLogin,GrandprixController.ListerGP);
    app.get('/grandprix/ajoutGP',verifLogin,GrandprixController.AjoutGP);
    app.post('/grandprix/ajoutGP',verifLogin,GrandprixController.AjoutInfoGP);
    app.get('/grandprix/modifier/:GPNUM',verifLogin,GrandprixController.ModifierGP);
    app.post('/grandprix/modifier/:GPNUM',verifLogin,GrandprixController.ModifierInfoGP);
    app.get('/grandprix/supprimer/:GPNUM',verifLogin,GrandprixController.SupprimerGP);

    //fournisseurs
    app.get('/fournisseurs',verifLogin,FournisseurController.ListerFournisseur);
    app.get('/fournisseurs/ajoutFourn',verifLogin,FournisseurController.AjoutFourn);
    app.post('/fournisseurs/ajoutFourn',verifLogin,FournisseurController.AjoutInfoFourn);
    app.get('/fournisseurs/supprimer/:FPNUM',verifLogin,FournisseurController.SupprimerFournisseur);
    app.get('/fournisseurs/modifier/:FPNUM',verifLogin,FournisseurController.ModifierFournisseur);
    app.post('/fournisseurs/modifier/:FPNUM',verifLogin,FournisseurController.ModifierInfoFournisseur);

    // tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
function verifLogin(req, res, next) {
    if (req.session.isConnected === undefined || req.session.isConnected === "") {
        res.redirect('/login');
        return;
    }
    next();
}
