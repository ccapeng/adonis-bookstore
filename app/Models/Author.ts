import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export interface IAuthor {
  id: number,
  lastName: string,
  firstName: string,
}

export default class Author extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public lastName: string

  @column()
  public firstName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public getListJson():IAuthor {
    return this.getJson();
  }

  public getJson():IAuthor {
    return {
      id: this.id,
      lastName: this.lastName,
      firstName: this.firstName
    } as IAuthor
  }

}
