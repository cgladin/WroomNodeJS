let AdminController = require('./../controllers/AdminController');
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', verifLogin, HomeController.Index);
    // Connexion
    app.get('/login', AdminController.Connexion);
    app.post('/login', AdminController.Authentification);
    app.get('/logout', AdminController.Logout);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);

 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);

 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);


// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
function verifLogin(req, res, next) {
    if (req.session.isConnected == undefined || req.session.isConnected == "") {
        res.redirect('/login');
        return;
    }
    next();
}
