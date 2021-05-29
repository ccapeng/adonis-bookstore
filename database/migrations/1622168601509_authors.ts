import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Authors extends BaseSchema {
  protected tableName = 'authors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('last_name', 32).notNullable()
      table.string('first_name', 32).notNullable()      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
