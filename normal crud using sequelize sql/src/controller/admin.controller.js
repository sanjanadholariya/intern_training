const userModel = require('../model/userModel')

module.exports.allEmployee = async (req, res) => {
    try {
        // console.log("all employee")
        const employees = await userModel.findAll({ where: { role: "Employee" } })
        // console.log(employees)
        const allEmployee = employees.map((users) => {
            return users.dataValues
        })
        console.log(allEmployee)

        if (!allEmployee) {
            return res.status(404).json({ message: "No Employees Found !" })
        }

        return res.status(200).json({ message: "All Employees fetch success", data: allEmployee })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}