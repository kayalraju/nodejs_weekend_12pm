

const AgeCheck = (req, res, next) => {
    const age = req.query.age;
    if (age < 18) {
        return res.status(401).json({
            success: false,
            message: "You are not allowed to access this page"
        });
    }
    next();
}

module.exports = AgeCheck