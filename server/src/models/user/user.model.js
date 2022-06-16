const bcrypt = require('bcrypt');
const pick = require('lodash/pick');

const { User, validateRegister, validateLogin } = require('./user.mongo');

const { Role } = require('./role.mongo');

async function GetCurrentUser(data) {
    return User.findById(data._id)
        .populate('roles profile', '-_id -__v')
        .select(['-password', '-__v']);
}

async function LoginUser(data) {
    const userData = pick(data, ['email', 'password']);
    const { error: validationError } = validateLogin(userData);

    if (validationError) {
        const error = Error(validationError.details[0].message);
        error.statusCode = 400;
        throw error;
    }

    let user = await User.findOne({ email: userData.email }).populate(
        'roles',
        'name'
    );

    if (!user) {
        const error = Error('Invalid email or password');
        error.statusCode = 400;
        throw error;
    }

    const validPassword = await bcrypt.compare(userData.password, user.password);

    if (!validPassword) {
        const error = Error('Invalid email or password');
        error.statusCode = 400;
        throw error;
    }

    const token = user.generateAuthToken();

    return token;
}

async function RegisterUser(data) {
    const userData = pick(data, ['username', 'email', 'password']);

    const { error: validationError } = validateRegister(userData);

    if (validationError) {
        const error = Error(validationError.details[0].message);
        error.statusCode = 400;
        throw error;
    }

    let user = await User.findOne({ email: userData.email });

    if (user) {
        const error = Error('User already registered');
        error.statusCode = 400;
        throw error;
    }

    let role = await Role.findOne({ name: 'user' });

    if (!role) {
        role = new Role({ name: 'user' });
        await role.save();
    }

    user = new User({
        ...userData,
        isActive: true,
        roles: [role._id],
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(userData.password, salt);

    await user.save();

    return user;
}

async function UpdateUser(id, data) {
    const user = new User({
        name: data.name,
        username: data.username,
        email: data.address,
        isActive: true,
    });

    return User.findByIdAndUpdate(id, user, {new: true});
}

async function DeleteUser(id) {
    const user = await User.findById(id);

    if (!user) {
        const error = Error('No matching user found');
        error.statusCode = 404;
        throw error;
    }

    const result = await user.updateOne({ isActive: false });

    return result.modifiedCount === 1;
}

module.exports = {
    LoginUser,
    GetCurrentUser,
    RegisterUser,
    UpdateUser,
    DeleteUser,
};
