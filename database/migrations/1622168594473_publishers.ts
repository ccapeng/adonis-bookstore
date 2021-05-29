import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Publishers extends BaseSchema {
  protected tableName = 'publishers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('name', 32).notNullable().unique()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
