const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/auth/User');
const { testFor } = require('../../utils/validation');

// TODO: extract value in environment variable (as of right now this is local so no problems just leaving it here)
// dev one can be visible, prod one - cannot (or just randomly generate one, problem being if the backend stops randomly it will make everyone need to login again)
const jwtSecret = 'aghauhgsy2723yug2324rwgs';

async function login(username, password) {
    const user = await User.findOne({ username });
    testFor(!user, 'Username or password is incorrect!');

    const passwordsAreSame = await bcrypt.compare(password, user.hashedPassword);
    testFor(!passwordsAreSame, 'Username or password is incorrect!');

    const token = createToken(user);

    return token;
}

async function register(username, email, password, repass) {
    testFor(password != repass, 'Passwords must match!');
    
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    testFor(!emailRegex.test(email), `${email} is not an email!`);

    const usernameExists = await User.findOne({ username: username });
    testFor(usernameExists, 'Username is taken!')

    const emailExists = await User.findOne({ email: email });
    testFor(emailExists, 'Email is taken!')

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        hashedPassword: hashedPassword
    });

    const token = createToken(user);

    return token;
}

async function verifyAdmin(userId) {
    const user = await User.findById(userId);
    testFor(!user, 'User does not exist')

    return user.roles.includes('admin');
}

function createToken({ _id, username, roles }) {
    const payload = {
        _id,
        username,
        roles
    };

    const token = jwt.sign(payload, jwtSecret);
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, jwtSecret);
}

module.exports = {
    login,
    register,
    verifyAdmin,
    verifyToken,
    createToken,
};