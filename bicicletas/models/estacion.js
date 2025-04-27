import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";
import Barrio from "./barrio.js";

class Estacion extends Model {}
Estacion.init(
    {
        idEstacion: {
            type: DataTypes.INTEGER,
            field: "ID_ESTACION",
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            field: "NOMBRE",
            unique: true,
            validate: {
                len: {
                    args: [5, 100],
                    msg: "El nombre debe tener entre 5 y 100 caracteres."
                }
            }
        },
        direccion: {
            type: DataTypes.STRING,
            field: "DIRECCION",
            unique: true,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "La direccion no debe tener más de 100 caracteres."
                }
            }
        },
        idBarrio: {
            type: DataTypes.INTEGER,
            field: "ID_BARRIO",
            references: {
                model: "Barrio",
                key: "idBarrio"
            }
        },
        activa: {
            type: DataTypes.INTEGER,
            field: "ACTIVA"
        }
    },
    {
        sequelize,
        modelName: "Estacion",
        tableName: "ESTACIONES",
        timestamps: false,
    }
);

Barrio.hasMany(Estacion, {foreignKey: "idBarrio"});
Estacion.belongsTo(Barrio, {foreignKey: "idBarrio"});

export default Estacion;