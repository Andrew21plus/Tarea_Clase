const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Articulo = sequelize.define('articulo', {
    numeroarticulo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    talla: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'articulo',
    timestamps: false
});

module.exports = Articulo;