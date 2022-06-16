module.exports.isAdmin = function (req, res, next) {
    const isAllowed = req.user.roles.some((role) => role.name === 'admin');

    if (!isAllowed) return res.status(403).send('Access denied.');

    next();
};

module.exports.isOwner = function (req, res, next) {
    const isAllowed = req.user.roles.some(
        (role) => role.name === 'admin' || role.name === 'owner'
    );

    if (!isAllowed) return res.status(403).send('Access denied.');

    next();
};

module.exports.isModerator = function (req, res, next) {
    const isAllowed = req.user.roles.some(
        (role) =>
            role.name === 'admin' ||
            role.name === 'owner' ||
            role.name === 'moderator'
    );
    if (!isAllowed) return res.status(403).send('Access denied.');

    next();
};
