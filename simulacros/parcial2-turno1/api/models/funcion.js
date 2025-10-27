import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
import Cine from "./cine.js";

class Funcion extends Model {}

Funcion.init({
    id: {
        field: "id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCine: {
        field: "idCine",
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pelicula: {
        field: "pelicula",
        type: DataTypes.STRING,
    },
    fechaDesde: {
        field: "fecha_desde",
        type: DataTypes.DATEONLY
    },
    fechaHasta: {
        field: "fecha_hasta",
        type: DataTypes.DATEONLY
    },
    horario: {
        field: "horario",
        type: DataTypes.STRING,
    },
    sala: {
        field: "sala",
        type: DataTypes.STRING
    }
}, {
    modelName: "Funcion",
    tableName: "Funciones",
    sequelize,
    timestamps: false
});

Funcion.belongsTo(Cine, { foreignKey: "idCine", as: "cine"});

export default Funcion;