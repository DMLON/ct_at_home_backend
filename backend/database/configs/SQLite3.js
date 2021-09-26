const options = {
    client: 'sqlite3',
    connection: {
        filename: `./database/databases/sqlite/${process.env.DATABASE}.sqlite`
    },
    useNullAsDefault: true
}

module.exports = {
    options
}