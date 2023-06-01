const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env"});

module.exports = {
    client: "pg",
    connection: "postgres://postgres:marllonpc@localhost:5432/arquitetura",
    // Tentei especificar o usuario, senha e db seguindo o link que me enviaram como solucao do problema: https://knexjs.org/guide/#configuration-options
    user : 'postgres',
    password : '123',
    database : 'arquitetura',
    migrations: {
        tableName: "knex_migrations",
    },
    pool: {
        min: 2,
        max: 10,
    }
}