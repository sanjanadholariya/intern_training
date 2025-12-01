const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "intern_task_1",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
        logging: false,
        pool: {
            max: 20,
            min: 5,
            idle: 60000,
            acquire: 10000
        },
        timezone: "+05:30",
        define: {
            timestamps: true,
            freezeTableName: true
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log("Database Connected...")
    })
    .catch(() => {
        console.log("Unable to connect", console.error);
    })

module.exports = sequelize