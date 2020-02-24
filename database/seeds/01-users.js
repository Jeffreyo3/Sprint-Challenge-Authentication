exports.seed = async knex => {
    await knex("users").truncate();

    await knex("users").insert([
        { username: "jeff", password: "1234" },
        { username: "melissa", password: "2345" },
        { username: "erik", password: "9876" },
        { username: "james", password: "tonystarks" },
        { username: "austin", password: "heyheyheyo" }
    ]);
};
