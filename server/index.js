const express = require("express");
const app = express();
const mysql = require("mysql");
const { Client } = require("pg");
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.json());

// Leer configuración del archivo JSON
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const dbConfig = config.database;
let db;


if (dbConfig.type === "mysql") {
    db = mysql.createConnection(dbConfig.mysql);
} else if (dbConfig.type === "postgres") {
    db = new Client(dbConfig.postgres);
    db.connect();
}

app.post("/create", (req, res) => {

    const nombreIBO = req.body.nombreIBO;
    const telefonoDiurno= req.body.telefonoDiurno;
    const direccion= req.body.direccion;
    const numeroIdentificacionDomicilio= req.body.numeroIdentificacionDomicilio;
    const ciudad= req.body.ciudad;
    const estado= req.body.estado;
    const codigoPostal= req.body.codigoPostal;
    const correoElectronico= req.body.correoElectronico
    const telefonoEntrega= req.body.telefonoEntrega;
    
    if (dbConfig.type === "mysql") {
        db.query(
            'INSERT INTO IBO (nombreIBO, telefonoDiurno, direccion, numeroIdentificacionDomicilio, ciudad, estado, codigoPostal, correoElectronico, telefonoEntrega) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [nombreIBO, telefonoDiurno, direccion, numeroIdentificacionDomicilio, ciudad, estado, codigoPostal, correoElectronico, telefonoEntrega], 
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error registrando el IBO");
                } else {
                    res.send("IBO Registrado con Éxito!!");
                }
            }
        );
    } else if (dbConfig.type === "postgres") {
        db.query(
            'INSERT INTO IBO (nombreIBO, telefonoDiurno, direccion, numeroIdentificacionDomicilio, ciudad, estado, codigoPostal, correoElectronico, telefonoEntrega) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
            [nombreIBO, telefonoDiurno, direccion, numeroIdentificacionDomicilio, ciudad, estado, codigoPostal, correoElectronico, telefonoEntrega], 
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error registrando el IBO");
                } else {
                    res.send("IBO Registrado con Éxito!!");
                }
            }
        );
    }
});

app.get("/ibos", (req, res) => {
    
    if (dbConfig.type === "mysql") {
        db.query('SELECT * FROM ibo', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error obteniendo los IBOs");
            } else {
                res.json(results);
            }
        });
    } else if (dbConfig.type === "postgres") {
        db.query('SELECT * FROM ibo', (err, results) => {   
            if (err) {
                console.error(err);
                res.status(500).send("Error obteniendo los IBOs");
            } else {
                res.json(results.rows);
            }
        });
    }
});

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { nombreIBO, telefonoDiurno, direccion, numeroIdentificacionDomicilio, ciudad, estado, codigoPostal, correoElectronico, telefonoEntrega } = req.body;

    if (dbConfig.type === "mysql") {
        db.query(
            'UPDATE IBO SET nombreIBO = ?, telefonoDiurno = ?, direccion = ?, numeroIdentificacionDomicilio = ?, ciudad = ?, estado = ?, codigoPostal = ?, correoElectronico = ?, telefonoEntrega = ? WHERE numeroIBO = ?', 
            [nombreIBO, telefonoDiurno, direccion, numeroIdentificacionDomicilio, ciudad, estado, codigoPostal, correoElectronico, telefonoEntrega, id], 
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error actualizando el IBO");
                } else {
                    res.send("IBO Actualizado con Éxito!!");
                }
            }
        );
    } else if (dbConfig.type === "postgres") {
        db.query(
            'UPDATE IBO SET nombreIBO = $1, telefonoDiurno = $2, direccion = $3, numeroIdentificacionDomicilio = $4, ciudad = $5, estado = $6, codigoPostal = $7, correoElectronico = $8, telefonoEntrega = $9 WHERE numeroIBO = $10', 
            [nombreIBO, telefonoDiurno, direccion, numeroIdentificacionDomicilio, ciudad, estado, codigoPostal, correoElectronico, telefonoEntrega, id], 
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error actualizando el IBO");
                } else {
                    res.send("IBO Actualizado con Éxito!!");
                }
            }
        );
    }
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    if (dbConfig.type === "mysql") {
        db.query('DELETE FROM IBO WHERE numeroIBO = ?', [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error eliminando el IBO");
            } else {
                res.send("IBO Eliminado con Éxito!!");
            }
        });
    } else if (dbConfig.type === "postgres") {
        db.query('DELETE FROM IBO WHERE numeroIBO = $1', [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error eliminando el IBO");
            } else {
                res.send("IBO Eliminado con Éxito!!");
            }
        });
    }
});

app.listen(3307, () => {
    console.log("Corriendo en el puerto 3307");
});
