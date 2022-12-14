const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [3 , 'Username must be at least 3 characters long']},
    email: { type: String, required: true, unique: true},
    hashedPassword: { type: String, required: true},
    roles: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user']},
    isBanned: { type: Boolean, default: false }
});

userSchema.index({username: 1}, {
    collation: {
        locale: 'en',
        strength: 2,
    }
});

const User = model('User', userSchema);

module.exports = User;
