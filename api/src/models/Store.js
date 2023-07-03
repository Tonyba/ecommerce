import { DataTypes } from "sequelize";

import sequelize from "../database/db.js";

export const Store = sequelize.define(
    "Store",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false        
        }
    }
)

