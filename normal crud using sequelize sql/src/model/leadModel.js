const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const userModel = require("./userModel");

const leadModel = sequelize.define(
    "lead", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: true
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    budget: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("new", "in-progress", "win", "lost"),
        allowNull: false
    },
    assignedTo: {
        type: DataTypes.INTEGER,    // id of employee user table's 'id' column
        allowNull: false,
        references: {
            model: 'user',      // table name
            key: 'id'          // column name of referenced table which we store data of that column
        }
    },
    isConverted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    freezeTableName: false
})

leadModel.belongsTo(userModel, { foreignKey: "assignedTo", as: "employee" })

module.exports = leadModel