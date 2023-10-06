// Table name
const urls = "urls";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable(urls, (table) => {
    table.increments("id").notNullable();
    table.string("original_url", 255);
    table.string("shortened_url", 255);
    table.timestamps(false, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists(urls);
}
