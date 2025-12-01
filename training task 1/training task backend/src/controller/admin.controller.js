const userModel = require("../model/userModel")
const leadModel = require('../model/leadModel')

module.exports.allEmployeeProfile = async (req, res) => {
    try {
        const allEmployee = await userModel.find({ role: "employee" }).select('-password')
        console.log(allEmployee)
        if (!allEmployee) {
            return res.status(404).json({ message: "No data found" })
        }
        return res.status(200).json({ message: "all employee profile fetch success", data: allEmployee })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.assignLead = async (req, res) => {
    try {
        console.log(req.body)
        const existEmployee = await userModel.findById(req.body.assignedTo)
        // console.log(existEmployee)
        if (!existEmployee) {
            return res.status(404).json({ message: "No Employee Found !" })
        }
        await leadModel.create(req.body)
        return res.status(201).json({ message: "Lead assign Success", lead: req.body })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server Error" })
    }
}

module.exports.deleteLead = async (req, res) => {
    try {
        const leadId = req.params.id

        const lead = await leadModel.findById(leadId)
        console.log(lead)

        if (!lead) {
            return res.status(404).json({ message: "No Lead Found !" })
        }

        await leadModel.findByIdAndDelete(leadId)
        return res.status(200).json({ message: "Lead delete success" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}