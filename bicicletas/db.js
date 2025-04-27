import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./data/db.sqlite"
});

// eso se usa mas adelante para algo
export function enableDbLog() {
    sequelize.options.logging = customLogger;
}

export function disableDbLog() {
    sequelize.options.logging = false; // Desactivar el logger
}

export default sequelize;