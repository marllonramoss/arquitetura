
exports.up = async function(knex) {
  const existe = await knex.schema.hasTable("usuario");
  if(existe) return;

  return knex.schema.createTable("usuario", (table) => {
    table.uuid("id").primary();
    table.string("nome").notNullable();
    table.string("email").notNullable();
    table.string("senha").notNullable();
  })
};


exports.down = function(knex) {
  return knex.schema.dropTableIfExists("usuario");
};
