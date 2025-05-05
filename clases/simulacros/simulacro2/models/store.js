import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";

class StarbucksStore extends Model {}

StarbucksStore.init({
    numero: {
        field: "STORE_NUMBER",
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    nombre: {
        field: "STORE_NAME",
        type: DataTypes.TEXT,
        unique: true,
        validate: {
            len: {
                args: [1, 50]
            }
        }
    },
    direccion: {
        field: "STREET_ADDRESS",
        type: DataTypes.TEXT
    },
    ciudad: {
        field: "CITY",
        type: DataTypes.TEXT
    },
    provincia: {
        field: "PROVINCE",
        type: DataTypes.TEXT
    },
    pais: {
        field: "COUNTRY",
        type: DataTypes.TEXT
    },
    codPost: {
        field: "POSTCODE",
        type: DataTypes.TEXT
    },
    longitud: {
        field: "LONGITUDE",
        type: DataTypes.REAL
    },
    latitud: {
        field: "LATITUDE",
        type: DataTypes.REAL
    }
}, {
    sequelize,
    modelName: "StarbucksStore",
    tableName: "STARBUCKS_DIRECTORY",
    timestamps: false
});

export default StarbucksStore;