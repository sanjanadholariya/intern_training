const leadModel = require('../model/leadModel')
const userModel = require('../model/userModel')

module.exports.addLead = async (req, res) => {
    try {
        // console.log("add lead")

        console.log(req.body)

        const employee = await userModel.findOne({ where: { id: req.body.assignedTo } })
        // console.log(employee.toJSON())

        if (!employee) {
            return res.status(404).json({ message: "Employee Does Not Exist !" })
        }
        if (req.body.status == 'win') {
            req.body.isConverted = true
        }
        const lead = await leadModel.create(req.body)
        // console.log(lead.toJSON())

        return res.status(201).json({ message: "Lead Add Success", data: lead.toJSON() })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.allLead = async (req, res) => {
    try {
        // console.log("all lead")

        const leads = await leadModel.findAll({
            include: [
                {
                    model: userModel,
                    as: "employee",
                    attributes: ["id", "name"]
                }
            ]
        })

        // console.log(leads)

        const allLead = leads.map((val) => {
            return val.toJSON()
        })
        // console.log(allLead)

        if (req.user.role == "Admin") {
            return res.status(200).json({ message: "All Lead Fetch Success", data: allLead })
        }
        if (req.user.role == "Employee") {
            const employeeLead = allLead.filter((val) => {
                return val.employee.id == req.user.id
            })
            // console.log(employeeLead)
            return res.status(200).json({ message: "Lead Fetch Success", data: employeeLead })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.editLead = async (req, res) => {
    try {
        // console.log(req.params.id)

        const lead = await leadModel.findByPk(req.params.id)
        console.log(lead.toJSON())

        if (!lead) {
            return res.status(404).json({ message: "Lead Not Define" })
        }

        // console.log(req.body)

        if (req.body.status == 'win') {
            req.body.isConverted = true
        }

        await leadModel.update(req.body, { where: { id: req.params.id } })
        const editedLead = await leadModel.findByPk(req.params.id)
        // console.log(editedLead)

        return res.status(200).json({ message: "Lead Edit Success", data: editedLead })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.deleteLead = async (req, res) => {
    try {
        console.log(req.params.id)

        const lead = await leadModel.findByPk(req.params.id)
        // console.log(lead.toJSON())

        if (!lead) {
            return res.status(404).json({ message: "Lead Not Found !" })
        }

        await leadModel.destroy({ where: { id: req.params.id } })

        return res.status(200).json({ message: "Lead Delete Success" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}