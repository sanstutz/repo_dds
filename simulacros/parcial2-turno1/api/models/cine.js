import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";

class Cine extends Model {}

Cine.init({
    id: {
        field: "id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        field: "nombre",
        type: DataTypes.STRING,
        unique: true
    },
    direccion: {
        field: "direccion",
        type: DataTypes.STRING
    }
}, {
    modelName: "Cine",
    tableName: "Cines",
    sequelize,
    timestamps: false
});

export default Cine;