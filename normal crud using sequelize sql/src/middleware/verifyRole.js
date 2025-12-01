const verifyRole = (...role) => {
    try {
        return (req, res, next) => {
            if (!role.includes(req.user.role)) {
                return res.status(403).json({ message: "You Cannot access this request" })
            }
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = verifyRole;