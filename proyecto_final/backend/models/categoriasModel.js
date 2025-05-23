import { Model, DataTypes } from "sequelize";
import sequelize from "./db.js";

class Categoria extends Model {};

Categoria.init({
    idCategoria: {
        type: DataTypes.INTEGER,
        field: "IdCategoria",
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        field: "Nombre",
        allowNull: false
    }
    }, {
    sequelize,
    modelName: "Categoria",
    tableName: "Categoria"
});

export default Categoria;