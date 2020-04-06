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

 // circuits
   app.get('/circuits',verifLogin, CircuitController.ListerCircuit);

// Ecuries
   app.get('/gestionEcuries',verifLogin, EcurieController.ListerEcurie);

 //Résultats
   app.get('/gestionResultats',verifLogin, ResultatController.ListerResultat);

// Sponsors
    app.get('/gestionSponsors',verifLogin, SponsorController.ListerSponsor);

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
