"use strict"

const DAOUser = require("./DAOUser");

class DAOAnswers {

    constructor(pool) { this.pool = pool; }

    getUserAnswers(idUser, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                const sql = "SELECT * FROM UsersAnswers WHERE IdUser = ?;";

                connection.query(sql, [idUser], (err, answer) => {
                    connection.release();
                    if (err) callback(new Error("Error de acceso a la base de datos: " + err.message));
                    else callback(null, answer[0]); 
                });
            }
        });
    }

    insertFirstAnswer(user, answer, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                let daoUser = new DAOUser(this.pool);

                daoUser.getUser(user, (err, result) => {
                    if (err) console.log(err);
                    else {
                        const sql = "UPDATE Users SET Answer1 = ? WHERE Id = ?;";

                        connection.query(sql, [answer, result.Id], (err) => {
                            connection.release();
                            if (err) console.log(err)
                            else callback(null);
                        })
                    }
                });
            }
            
        });
    }

    insertSecondAnswer(user, answer, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                let daoUser = new DAOUser(this.pool);

                daoUser.getUser(user, (err, result) => {
                    if (err) console.log(err);
                    else {
                        const sql = "UPDATE Users SET Answer2 = ? WHERE Id = ?;";

                        connection.query(sql, [answer, result.Id], (err) => {
                            connection.release();
                            if (err) console.log(err)
                            else callback(null);
                        })
                    }
                });
            }
            
        });
    }

    insertThirdAnswer(user, answer, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                let daoUser = new DAOUser(this.pool);

                daoUser.getUser(user, (err, result) => {
                    if (err) console.log(err);
                    else {
                        const sql = "UPDATE Users SET Answer3 = ? WHERE Id = ?;";

                        connection.query(sql, [answer, result.Id], (err) => {
                            connection.release();
                            if (err) console.log(err)
                            else callback(null);
                        })
                    }
                });
            }
            
        });
    }

    insertFourthAnswer(user, answer, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                let daoUser = new DAOUser(this.pool);

                daoUser.getUser(user, (err, result) => {
                    if (err) console.log(err);
                    else {
                        const sql = "UPDATE Users SET Answer4 = ? WHERE Id = ?;";

                        connection.query(sql, [answer, result.Id], (err) => {
                            connection.release();
                            if (err) console.log(err)
                            else callback(null);
                        })
                    }
                });
            }
            
        });
    }

    insertFifthAnswer(user, answer, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                let daoUser = new DAOUser(this.pool);

                daoUser.getUser(user, (err, result) => {
                    if (err) console.log(err);
                    else {
                        const sql = "UPDATE Users SET Answer5 = ? WHERE Id = ?;";

                        connection.query(sql, [answer, result.Id], (err) => {
                            connection.release();
                            if (err) console.log(err)
                            else callback(null);
                        })
                    }
                });
            }
            
        });
    }

    insertSixthAnswer(user, answer, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                let daoUser = new DAOUser(this.pool);

                daoUser.getUser(user, (err, result) => {
                    if (err) console.log(err);
                    else {
                        const sql = "UPDATE Users SET Answer6 = ? WHERE Id = ?;";

                        connection.query(sql, [answer, result.Id], (err) => {
                            connection.release();
                            if (err) console.log(err)
                            else callback(null);
                        })
                    }
                });
            }
            
        });
    }

    insertSeventhAnswer(user, answer, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                let daoUser = new DAOUser(this.pool);

                daoUser.getUser(user, (err, result) => {
                    if (err) console.log(err);
                    else {
                        const sql = "UPDATE Users SET Answer7 = ? WHERE Id = ?;";

                        connection.query(sql, [answer, result.Id], (err) => {
                            connection.release();
                            if (err) console.log(err)
                            else callback(null);
                        })
                    }
                });
            }
            
        });
    }

    getResults(user, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos: " + err.message));
            else {
                let daoUser = new DAOUser(this.pool);

                daoUser.getUser(user, (err, result) => {
                    if (err) console.log(err);
                    else {
                        const sql = "SELECT * FROM Users WHERE Id = ?;";

                        connection.query(sql, [result.Id], (err, results) => {
                            connection.release();
                            if (err) callback(new Error("Error de acceso a la base de datos: " + err.message));
                            else callback(null, results[0]);
                        });
                    }
                }); 
            }
        });
    }

}   

module.exports = DAOAnswers;