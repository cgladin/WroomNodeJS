var db = require('../configDb');

////// Verifie  la validité du login

module.exports.login = function(login, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            var sql = "SELECT LOGIN, PASSWD FROM login WHERE login = '" + login + "'";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};