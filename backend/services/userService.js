const User = require("../models/auth/User");
const { testFor } = require("../utils/validation");

async function getAllUsers(curUserId) {
    return User.find({ _id: { $ne: curUserId } }).lean();
}

async function banUser(userId, adminId) {
    const userToBan = await User.findById(userId);
    testFor(!userToBan, "User to ban does not exist");

    const admin = await User.findById(adminId);
    testFor(!admin, "Admin does not exist");
    testFor(!admin.roles.includes('admin'), `User ${admin.username} is not an admin.`);
    testFor(admin.isBanned, `Admin that is banned cannot ban.`);
    testFor(userToBan._id.toString() == admin._id.toString(), 'One cannot simply ban themselves.');

    testFor(userToBan.isBanned, `User ${userToBan.username} is already banned.`);
    
    userToBan.isBanned = true;
    await userToBan.save();

    return userToBan;
}

async function unBanUser(userId, adminId) {
    const userToBan = await User.findById(userId);
    testFor(!userToBan, "User to unban does not exist");

    const admin = await User.findById(adminId);
    testFor(!admin, "Admin does not exist");
    testFor(!admin.roles.includes('admin'), `User ${admin.username} is not an admin.`);
    testFor(admin.isBanned, `Admin that is banned cannot unban.`);
    testFor(userToBan._id.toString() == admin._id.toString(), 'One cannot simply unban themselves.');

    testFor(!userToBan.isBanned, `User ${userToBan.username} is not banned.`);

    userToBan.isBanned = false;
    await userToBan.save();

    return userToBan;
}

module.exports = {
    getAllUsers,
    banUser,
    unBanUser,
}