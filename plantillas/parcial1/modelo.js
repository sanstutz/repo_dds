import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

class Modelo extends Model {}

Modelo.init({
    pk: {
        field: "",
        type: DataTypes.INTEGER,
        primaryKey: true
        //autoIncrement: true
    },
    campoTexto: {
        field: "",
        type: DataTypes.TEXT
    },
    campoReal: {
        field: "",
        type: DataTypes.REAL
    },
    campoInt: {
        field: "",
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    tableName: "tabla",
    modelName: "modelo",
    timestamps: false
});

export default Modelo;