const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const userModel = sequelize.define(
    "user", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("Admin", "Employee"),
        allowNull: false,
    }
},
    {
        timestamps: true,
        freezeTableName: true
    }
)

module.exports = userModel;