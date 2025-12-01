const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
    try {
        const existUser = await userModel.findOne({ where: { email: req.body.email } })
        if (existUser) {
            return res.status(409).json({ message: "User Already Exist" })
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)

        const user = await userModel.create(req.body)
        return res.status(201).json({ message: "User Register Success", data: user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.login = async (req, res) => {
    try {
        const existUser = await userModel.findOne({ where: { email: req.body.email } })
        if (!existUser) {
            return res.status(404).json({ message: "User Not Exist , Login First." })
        }

        const checkPass = await bcrypt.compare(req.body.password, existUser.password)
        if (!checkPass) {
            return res.status(403).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ id: existUser.id }, "testing")
        console.log(token)

        return res.status(200).json({ message: "Login Success", token: token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server Error" })
    }
}