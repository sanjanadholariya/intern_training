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

module.exports.editEmployee = async (req, res) => {
    try {
        console.log(req.params.id)
        const employee = await userModel.findByPk(req.params.id)
        // console.log(employee)
        if (!employee) {
            return res.status(404).json({ message: "Employee Not Found !" })
        }
        await userModel.update(req.body, { where: { id: req.params.id } }, { returning: true })
        const updatedEmployee = await userModel.findByPk(req.params.id)
        // console.log(updatedEmployee.toJSON())

        return res.status(200).json({ message: "Employee Update Success", data: updatedEmployee.toJSON() })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.deleteEmployee = async (req, res) => {
    try {
        // console.log(req.params.id)
        const employee = await userModel.findByPk(req.params.id)
        // console.log(employee.toJSON())

        if (!employee) {
            return res.status(404).json({ message: "Employee Not Found !" })
        }

        await userModel.destroy({ where: { id: req.params.id } })
        return res.status(200).json({ message: "Employee Delete Success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}