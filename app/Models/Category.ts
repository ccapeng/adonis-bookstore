import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export interface ICategory {
  id: number,
  name: string,
}

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public getListJson():ICategory {
    return this.getJson();
  }

  public getJson():ICategory {
    return {
      id: this.id,
      name: this.name
    } as ICategory
  }

}
