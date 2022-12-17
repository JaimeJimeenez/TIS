"use strict";

const config = require("./config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan")
const DAOUser = require("./DAOUser");
const DAOAnswers = require("./DAOAnswers");
const DAOSocials = require("./DAOSocials");

const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore(config.mysqlConfig);

const middlewareSession = session ( {
    saveUninitialized: false,
    secret: "BFJ",
    resave: false,
    store: sessionStore
});

// Crear un servidor Express.js
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded( { extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + '/public'));
app.use(middlewareSession);
app.use(morgan("dev"));

// Pool Connections
const pool = mysql.createPool(config.mysqlConfig);

// DAO's
const daoUser = new DAOUser(pool);
const daoAnswers = new DAOAnswers(pool);
const daoSocials = new DAOSocials(pool);

app.get("/", (request, response) => {
    response.status(200);
    response.render("inicio", { errorMsg : null });
});

app.post("/login", (request, response) => {
    daoUser.newUser(request.body.user, (err, result) => {
        if (err) console.log(err);
        else if (result) {
            request.session.currentUser = request.body.user;
            response.redirect("/redes");
        }
        else response.render("inicio", { errorMsg : "El usuario ya existe."});
    });
});

app.get("/redes", (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "seleccionarRedes.html"));
});

app.post("/redes", (request, response) => {
    const keys = [ "instagram", "twitter", "linkedin", "wathsapp", "facebook", "youtube" ];
    let social = request.body;
    let answers = { };

    for (let i = 0; i < keys.length; i++)
        answers[keys[i]] = social.hasOwnProperty(keys[i]) ? 0 : 1;
    
    daoSocials.insertSocialNetworks(request.session.currentUser, answers, (err) => {
        if (err) console.log(err);
        else response.redirect("/pregunta1");
    });
});

app.get("/pregunta1", (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "pregunta1.html"));
});

app.post("/respuesta1", (request, response) => {
    let answer = request.body.opciones==="opcion1" ? 0 : 1;

    daoAnswers.insertFirstAnswer(request.session.currentUser, answer, (err) => {
        if (err) console.log(err);
        else response.redirect("/pregunta2");
    });
});

app.get("/pregunta2", (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "pregunta2.html"));
});

app.post("/respuesta2", (request, response) => {
    let answer = request.body.opciones==="opcion1" ? 0 : 1;

    daoAnswers.insertSecondAnswer(request.session.currentUser, answer, (err) => {
        if (err) console.log(err);
        else response.redirect("/pregunta3");
    });
});

app.get("/pregunta3", (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "pregunta3.html"));
});

app.post("/respuesta3", (request, response) => {
    let answer = request.body.opciones==="opcion1" ? 0 : 1;

    daoAnswers.insertThirdAnswer(request.session.currentUser, answer, (err) => {
        if (err) console.log(err);
        else response.redirect("/pregunta4");
    });
});

app.get("/pregunta4", (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "pregunta4.html"));
});

app.post("/respuesta4", (request, response) => {
    let answer = request.body.opciones==="opcion1" ? 0 : 1;

    daoAnswers.insertFourthAnswer(request.session.currentUser, answer, (err) => {
        if (err) console.log(err);
        else response.redirect("/pregunta5");
    });
});

app.get("/pregunta5", (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "pregunta5.html"));
});

app.post("/respuesta5", (request, response) => {
    let answer = request.body.opciones==="opcion1" ? 0 : 1;

    daoAnswers.insertFifthAnswer(request.session.currentUser, answer, (err) => {
        if (err) console.log(err);
        else response.redirect("/pregunta6");
    });
});

app.get("/pregunta6", (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "pregunta6.html"));
});

app.post("/respuesta6", (request, response) => {
    let answer = request.body.opciones==="opcion1" ? 0 : 1;

    daoAnswers.insertSixthAnswer(request.session.currentUser, answer, (err) => {
        if (err) console.log(err);
        else response.redirect("/pregunta7");
    });
});

app.get("/pregunta7", (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "pregunta7.html"));
});

app.post("/respuesta7", (request, response) => {
    let answer = request.body.opciones==="opcion1" ? 0 : 1;

    daoAnswers.insertSeventhAnswer(request.session.currentUser, answer, (err) => {
        if (err) console.log(err);
        else response.redirect("/perfil");
    });
});

app.get("/perfil", (request, response) => {
    response.status(200);
    daoAnswers.getResults(request.session.currentUser, (err, results) => {
        if (err) console.log(err);
        else {
            let num = 0;
            let keys = Object.keys(results);
            
            for (let i = 2; i < keys.length; i++)
                if (results[keys[i]]) num++;
                
            response.render("perfiles", { num : num });
        }
    });
}); 

// Arrancar el servidor
app.listen(config.port, function(err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});