const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const projectModel = sequelize.define(
    "project", {
    clientName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    budget: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assignedTo: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    projectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("new", "in-progress", "success", "rejected"),
        allowNull: false
    }
},
    {
        timestamps: true,
        freezeTableName: false
    }
)

module.exports = projectModel