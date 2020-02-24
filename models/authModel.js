const db = require('../database/dbConfig');

module.exports = {
    add,
    findFilter
}

function add(user) {
    return db("users")
        .insert(user)
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function findById(id) {
    return db("users")
        .where({ id })
        .first();
}

function findFilter(filter) {
    return db("users")
        .select('id', 'username', 'password')
        .where(filter)
        .first();
}