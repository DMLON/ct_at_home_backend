const options = {
    client: 'sqlite3',
    connection: {
        filename: "./database/databases/sqlite/ecommerce.sqlite"
    },
    useNullAsDefault: true
}

module.exports = {
    options
}