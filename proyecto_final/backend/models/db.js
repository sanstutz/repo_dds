import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./.data/pymes.db",
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

export default sequelize;