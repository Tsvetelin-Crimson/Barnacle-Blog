const User = require("../models/auth/User")

async function getAllUsers() {
    return User.find({}).lean();
}

module.exports = {
    getAllUsers,
}