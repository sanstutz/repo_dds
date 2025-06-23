import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
import Serie from "./serie.js";

class Temporada extends Model {}

Temporada.init({
    id: {
        field: "id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idSerie: {
        field: "idSerie",
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numero: {
        field: "numero",
        type: DataTypes.INTEGER,
        allowNull: false
    },
    episodios: {
        field: "episodios",
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estreno: {
        field: "anioEstreno",
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genero: {
        field: "genero",
        type: DataTypes.TEXT,
        allowNull: false
    },
    creador: {
        field: "creador",
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Temporada",
    tableName: "Temporadas",
    timestamps: false
});

Temporada.belongsTo(Serie, {foreignKey: "idSerie", as: "serie"});
Serie.hasMany(Temporada, {foreignKey: "idSerie", as: "temporadas"});

export default Temporada;