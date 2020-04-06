"use strict";
let model = require('../models/admin.js');
let Cryptr = require('cryptr');
let cryptr= new Cryptr('MaSuperCléDeChiffrementDeouF');

//////////////////// CONNEXION //////////////////////////

module.exports.Connexion = function(request, response) {
    response.title = 'Connexion';
    response.render('login', response);
};

//////////////////// AUTHENTIFICATION DE L'UTILISATEUR //////////////////////////

module.exports.Authentification = function(request, response) {
    response.title = 'Connexion..';
    let login = request.body.login;
    let pwd = request.body.pwd;
    let encryptedString = cryptr.encrypt(pwd);
    model.login(login,encryptedString, function(err, res) {
        if (err) {
            console.log(err);
            return;
        }
        if (res == '') {
            response.fail = "Login ou mot de passe incorrect";
            response.render('login', response);
            return;
        } else {
            var session = request.session;
            session.isConnected = true;
            response.redirect("/");
        }
    });
};

//////////////////// DECONNEXION //////////////////////////

module.exports.Logout = function(request, response) {
    let session = request.session;
    session.isConnected = undefined;
    response.redirect('/login');
};