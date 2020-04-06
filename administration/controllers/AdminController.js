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
    response.title = 'Authentification';
    let login = request.body.login;
    let pwd = request.body.pwd;
    model.login(login, function(err, res) {
        if (err) {
            console.log(err);
            return;
        }
    console.log(cryptr.decrypt(res[0].PASSWD));

        if (res[0].LOGIN == 'admin') {
            if(cryptr.decrypt(res[0].PASSWD) == pwd){
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