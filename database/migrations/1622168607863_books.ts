import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('title', 128).notNullable()
      table.integer('category_id').unsigned();
      table
        .foreign('category_id')
        .references('categories.id')
      table.integer('publisher_id').unsigned();
      table
        .foreign('publisher_id')
        .references('publishers.id')
      table.integer('author_id').unsigned();
      table
        .foreign('author_id')
        .references('authors.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
