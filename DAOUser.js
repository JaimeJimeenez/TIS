"use strict"

class DAOUser {
    
    constructor(pool) { this.pool = pool; }

    newUser(user, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else this.getUser(user, (err, result) => {
                if (err) console.log(err);
                else if (result !== undefined) callback(null, false);
                else {
                    const sql = "INSERT INTO Users (Name) VALUE (?);";

                    connection.query(sql, [user], (err) => {
                        connection.release();
                        if (err) callback(new Error("Error de acceso a la base de datos: " + err.message));
                        else callback(null, true);
                    });
                }
            });
        });
    }

    getUser(user, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                const sql = "SELECT * FROM Users WHERE Name  = ?;";

                connection.query(sql, [user], (err, result) => {
                    connection.release();
                    if (err) callback(new Error("Error de acceso a la base de datos: " + err.message));
                    else callback(null, result[0]);
                });
            }
        });
    }
}

module.exports = DAOUser;