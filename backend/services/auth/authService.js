const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/auth/User')

const jwtSecret = 'aghauhgsy2723yug2324rwgs';

async function login(username, password) {
    //TODO: Uncomment and add othe validation if needed
    // const user = await User.findOne({ username });
    // if(!user) {
    //     throw new Error('Username or password is incorrect!');
    // }

    // const passwordsAreSame = await bcrypt.compare(password, user.hashedPassword);

    // if(!passwordsAreSame)
    // {
    //     throw new Error('Username or password is incorrect!');
    // }
    let user = {
        username, password
    }
    const token = createToken(user);

    return token;
}

async function register(username, password, repass) {
    const exists = await User.findOne({ username: username });
    if(exists) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword: hashedPassword
    });

    //TODO: Check to see if user needs to logged after registering
    const token = createToken(user);

    return token;
}

function createToken({ _id, username }) {
    const payload = {
        _id,
        username
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
    verifyToken,
    createToken,
};