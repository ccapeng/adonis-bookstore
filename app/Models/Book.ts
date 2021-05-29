import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Category, {ICategory} from './Category'
import Publisher, {IPublisher} from './Publisher'
import Author, {IAuthor} from './Author'

export interface IBook {
  id: number,
  title: string,
  categoryId: number,
  publisherId: number,
  authorId: number
}

export interface IBookDetail {
  id: number,
  title: string,
  category: ICategory,
  publisher: IPublisher,
  author: IAuthor
}


export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public categoryId: number

  @belongsTo(() => Category, {
    foreignKey: 'categoryId',
  })
  public category: BelongsTo<typeof Category>
  
  @column()
  public publisherId: number

  @belongsTo(() => Publisher, {
    foreignKey: 'publisherId',
  })
  public publisher: BelongsTo<typeof Publisher>

  @column()
  public authorId: number

  @belongsTo(() => Author, {
    foreignKey: 'authorId',
  })
  public author: BelongsTo<typeof Author>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public getJson():IBook {
    return {
      id: this.id,
      title: this.title,
      categoryId: this.categoryId,
      publisherId: this.publisherId,
      authorId: this.authorId
    } as IBook
  }

  static getQueryJson(obj:any):IBookDetail {
    return {
      id: obj.id,
      title: obj.title,
      category: {
          id: obj.categoryId,
          name: obj.categoryName
      },
      publisher: {
          id: obj.publisherId,
          name: obj.publisherName
      },
      author: {
          id: obj.authorId,
          lastName: obj.authorLastName,
          firstName: obj.authorFirstName
      }
    }
  }

}