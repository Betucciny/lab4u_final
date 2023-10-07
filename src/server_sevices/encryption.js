const bcrypt = require('bcrypt');

async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

export {comparePassword, hashPassword};