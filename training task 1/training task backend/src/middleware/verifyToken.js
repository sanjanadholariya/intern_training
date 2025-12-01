const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')

// module.exports.verifyToken = async (req, res, next) => {
//     try {
//         let authorization = req.headers.authorization
//         if (!authorization) {
//             return res.status(402).json({ message: "access denied ! unauthorized user" })
//         }
//         else {
//             let token = authorization.split(" ")[1]
//             // console.log(token)

//             const { id } = jwt.verify(token, "testing")
//             // console.log(id)
//             const user = await userModel.findById(id)
//             // console.log("user", user)
//             req.user = user
//             next();
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports.verifyToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;

        if (!auth || !auth.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = auth.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const decoded = jwt.verify(token, "testing");

        req.user = await userModel.findById(decoded.id);

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Token Invalid" });
    }
}
