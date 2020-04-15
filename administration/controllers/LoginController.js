let model = require('../models/login.js');
let Cryptr = require('cryptr');
let cryptr= new Cryptr('MaSuperCléDeChiffrementDeouF');

//////////////////// CONNEXION //////////////////////////

module.exports.Connexion = function(request, response) {
    response.title = 'Connexion';
    // permet d'afficher la page de login
    response.render('login', response);
};

//////////////////// AUTHENTIFICATION DE L'UTILISATEUR //////////////////////////

module.exports.Authentification = function(request, response) {
    response.title = 'Authentification';
    // récupération du mot de passe et login dans le form
    let login = request.body.login;
    let pwd = request.body.pwd;
    model.login(login, function(err, res) {
        if (err) {
            console.log(err);
            return;
        }

        if (res[0].LOGIN === 'admin') { // vérification de login
            if(cryptr.decrypt(res[0].PASSWD) == pwd){ //vérification de mot de passe avec la base de donnée
                var session = request.session;
                session.isConnected = true;
                response.redirect("/");
            } else {
                response.fail = "Mot de passe incorrect";
                response.render('login', response);
            }
        } else {
            response.fail = "Login incorrect";
            response.render('login', response);
        }
    });
};

//////////////////// DECONNEXION //////////////////////////
module.exports.Logout = function(request, response) {
    let session = request.session;
    session.isConnected = undefined;
    response.redirect('/login');
};