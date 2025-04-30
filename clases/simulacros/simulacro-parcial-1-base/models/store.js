import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";

class StarbucksStore extends Model {}

StarbucksStore.init({
    numero: {
        type: DataTypes.TEXT,
        field: "STORE_NUMBER",
        primaryKey: true
    },
    nombre: {
        type: DataTypes.TEXT,
        field: "STORE_NAME"
    },
    direccion: {
        type: DataTypes.TEXT,
        field: "STREET_ADDRESS"
    },
    ciudad: {
        type: DataTypes.TEXT,
        field: "CITY"
    },
    provincia: {
        type: DataTypes.TEXT,
        field: "PROVINCE"
    },
    pais: {
        type: DataTypes.TEXT,
        field: "COUNTRY"
    },
    codigoPostal: {
        type: DataTypes.TEXT,
        field: "POSTCODE"
    },
    longitud: {
        type: DataTypes.REAL,
        field: "LONGITUDE"
    },
    latitud: {
        type: DataTypes.REAL,
        field: "LATITUDE"
    }},
    {
        sequelize,
        modelName: "StarbucksStore",
        tableName: "STARBUCKS_DIRECTORY",
        timestamps: false
    }
);

export default StarbucksStore;