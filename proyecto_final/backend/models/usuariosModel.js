import { Model, DataTypes } from "sequelize";
import sequelize from "./db.js";

class Usuario extends Model {};

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        field: "IdUsuario",
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        field: "Nombre",   
        allowNull: false
    },
    clave: {
        type: DataTypes.STRING,
        field: "Clave",
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        field: "Rol",
        allowNull: false
    }
}, {
    sequelize,
    tableName: "Usuario",
    modelName: "Usuario"
});

export default Usuario;
