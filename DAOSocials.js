"use strict"

const DAOUser = require("./DAOUser");

class DAOSocials {

    constructor(pool) { this.pool = pool; }

    insertUserSocial(user, socials, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                const sql = "INSERT INTO UsersSocial (IdUser, IdSocial) VALUES (?, ?);"
                
                connection.query(sql, [user, socials], (err) => {
                    connection.release();
                    if (err) callback(new Error("Error de acceso a la base de datos: " + err.message));
                });
            }
        });
    }

    insertSocialNetworks(user, networks, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                let daoUser = new DAOUser(this.pool);
                
                daoUser.getUser(user, (err, result) => {
                    if (err) console.log(err);
                    else if (result === undefined)
                        callback(new Error("Error: el usuario no existe"));
                    else {
                        const sql = "INSERT INTO Social (Instagram, Facebook, Twitter, Linkedin, Wathsapp, Youtube) VALUES (?, ?, ?, ?, ?, ?);"

                        connection.query(sql, [networks.instagram, networks.facebook, networks.twitter, networks.linkedin, networks.wathsapp, networks.youtube], (err, socials) => {
                            if (err) callback(new Error("Error de acceso a la base de datos: " + err.message));
                            else this.insertUserSocial(result.Id, socials.insertId, (err) => {
                                if (err) console.log(err);
                            });
                        });
                        connection.release();
                        callback(null);
                    }
                });
            }
        });
    }
}

module.exports = DAOSocials;