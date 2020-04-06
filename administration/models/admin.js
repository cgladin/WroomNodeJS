var db = require('../configDb');

////// Verifie  la validité du login

module.exports.login = function(login, password, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            var sql = "SELECT login, passwd FROM login WHERE login = '" + login + "' AND passwd = '" + password + "'";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};