const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const leadModel = require('../model/leadModel')
const activityModel = require('../model/activityModel')

module.exports.register = async (req, res) => {
    try {
        const existUser = await userModel.findOne({ email: req.body.email })
        if (existUser) {
            return res.status(409).json({ message: "User Already Exist" })
        }
        else {
            req.body.profile = req.file.filename
            req.body.password = await bcrypt.hash(req.body.password, 10)
            console.log(req.body)

            await userModel.create(req.body)
            return res.status(202).json({ message: "User Register Success" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.login = async (req, res) => {
    try {
        const existUser = await userModel.findOne({ email: req.body.email })
        if (!existUser) {
            return res.status(400).json({ message: "User Does Not Exist ! Register First" })
        }
        else {
            const checkPass = await bcrypt.compare(req.body.password, existUser.password)
            if (checkPass) {
                const token = await jwt.sign({ id: existUser._id }, "testing")
                // console.log(token)
                return res.status(200).json({ message: "Login Success", token: token })
            } else {
                return res.status(402).json({ message: "Incorrect password" })
            }

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


module.exports.profile = async (req, res) => {
    try {
        const id = req.user.id
        if (!id) {
            return res.status(404).json({ message: "ID not found" })
        }
        const user = await userModel.findById(id).select('-password')
        return res.status(200).json({ message: "profile fetch success", data: user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server Error" })
    }
}

module.exports.getSingleLead = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const singleLead = await leadModel.findById(id)
        console.log(singleLead)
        if (!singleLead) {
            return res.status(404).json({ message: "Lead Not Found" })
        }
        return res.status(200).json({ message: "Fetch Single Lead success", lead: singleLead })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.getLeads = async (req, res) => {
    try {
        const leads = await leadModel.find().populate('assignedTo')
        if (req.user.role == "admin") {
            return res.status(200).json({ message: "fetch leads success", data: leads })
        }
        if (req.user.role == "employee") {

            const employeeLeads = leads.filter(val => val.assignedTo.id == req.user._id)
            console.log(employeeLeads)
            if (employeeLeads.length == 0) {
                return res.status(200).json({ message: "No assigned leads", })
            }
            return res.status(200).json({ message: "fetch lead success", data: employeeLeads })
        }
        // console.log(leads)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.updateLead = async (req, res) => {
    try {
        const leadId = req.params.id

        const lead = await leadModel.findById(leadId).populate('assignedTo')
        // console.log(lead)

        if (req.user.role == "employee" && req.user.id != lead.assignedTo.id) {
            return res.status(403).json({ message: "unauthorized" })
        }

        const updatedLead = await leadModel.findByIdAndUpdate(leadId, req.body, { new: true })

        return res.status(200).json({ message: "Lead Update Success", data: updatedLead })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.addActivity = async (req, res) => {
    try {
        const leadId = req.params.id
        const employeeId = req.user.id

        const lead = await leadModel.findById(leadId)
        // console.log(lead)
        if (!lead) {
            return res.status(404).json({ message: "lead not found" })
        }
        const { type, description } = req.body

        console.log(req.body)
        await activityModel.create({ leadId, employeeId, type, description })
        return res.status(201).json({ message: "Activity add success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.viewActivity = async (req, res) => {
    try {
        const leadId = req.params.id

        const activity = await activityModel.find({ leadId: leadId })
        if (!activity) {
            // console.log(activity)
            return res.status(404).json({ message: "No activity found" })
        }
        console.log(activity)

        return res.status(200).json({ message: "activity data fetch success", data: activity })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

