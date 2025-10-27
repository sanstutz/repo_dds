// db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./data/dbCines.sqlite"
});

export default sequelize;
