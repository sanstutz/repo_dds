import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";

class Serie extends Model { }

Serie.init({
    id: {
        field: "id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        field: "titulo",
        type: DataTypes.TEXT,
        allowNull: false
    },
    plataforma: {
        field: "plataforma",
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Serie",
    tableName: "Series",
    timestamps: false
});

export default Serie;
