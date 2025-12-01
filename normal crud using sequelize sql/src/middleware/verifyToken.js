const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')

module.exports.verifyToken = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        // console.log(authorization)
        if (!authorization) {
            return res.status(403).json({ message: "Access Denied , You Cannot Access" })
        }
        const token = authorization.split(" ")[1]
        // console.log(token)

        const { id } = jwt.verify(token, "testing")
        // console.log(id)

        const user = await userModel.findOne({ where: { id: id } })
        // console.log(user.dataValues)

        req.user = user.dataValues
        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}