let LoginController = require('../controllers/LoginController');
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let SponsorController = require('./../controllers/SponsorController');

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
    app.post('/resultats',verifLogin, ResultatController.SaisieResultat);
    app.post('/resultats/saisieResultats',verifLogin, ResultatController.SaisieInfoResultat);

    // Sponsors
    app.get('/sponsors',verifLogin, SponsorController.ListerSponsor);
    app.get('/sponsors/ajoutSponsor',verifLogin,SponsorController.AjoutSponsor);
    app.post('/sponsors/ajoutSponsor',verifLogin,SponsorController.AjoutInfoSponsor);
    app.get('/sponsors/supprimer/:SPONUM',verifLogin,SponsorController.SupprimerSponsor);
    app.get('/sponsors/modifier/:SPONUM',verifLogin,SponsorController.ModifierSponsor);
    app.post('/sponsors/modifier/:SPONUM',verifLogin,SponsorController.ModifierInfoSponsor);

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
