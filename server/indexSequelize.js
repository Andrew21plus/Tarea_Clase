const express = require('express');
const cors = require('cors');
const fs = require('fs');
const sequelize = require('./database');
const Articulo = require('./Articulo');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Sincronizar modelos 
sequelize.sync()
    .then(() => console.log('Models synchronized...'))
    .catch(err => console.log('Error: ' + err));

// Rutas CRUD para Articulo
app.post('/articulos', async (req, res) => {
    try {
        const articulo = await Articulo.create(req.body);
        res.json(articulo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creando el artículo');
    }
});

app.get('/articulos', async (req, res) => {
    try {
        const articulos = await Articulo.findAll();
        res.json(articulos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error obteniendo los artículos');
    }
});

app.put('/articulos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Articulo.update(req.body, {
            where: { numeroarticulo: id }
        });
        if (updated) {
            const updatedArticulo = await Articulo.findOne({ where: { numeroarticulo: id } });
            res.json(updatedArticulo);
        } else {
            res.status(404).send('Artículo no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error actualizando el artículo');
    }
});

app.delete('/articulos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Articulo.destroy({
            where: { numeroarticulo: id }
        });
        if (deleted) {
            res.send('Artículo eliminado');
        } else {
            res.status(404).send('Artículo no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error eliminando el artículo');
    }
});

app.listen(3308, () => {
    console.log('Corriendo en el puerto 3308');
});
