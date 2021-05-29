import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Database from '@ioc:Adonis/Lucid/Database'
// import Book, {IBookDetail} from 'App/Models/Book';
// import Category from 'App/Models/Category';
// import Publisher from 'App/Models/Publisher';
// import Author from 'App/Models/Author';
import Book from 'App/Models/Book';

export default class BooksController {

    async index (context: HttpContextContract) {
        const {response} = context;
        //const books = await Book.all()

        // const books = await Database
        //     .from("books")
        //     .leftJoin("categories", "books.category_id", "categories.id")
        //     .leftJoin("publishers", "books.publisher_id", "publishers.id")
        //     .leftJoin("authors", "books.author_id", "authors.id")
        //     .select("books.id as id")
        //     .select("books.title as title")
        //     .select("books.category_id as categoryId")
        //     .select("books.publisher_id as publisherId")
        //     .select("books.author_id as authorId")
        //     .select("categories.name as categoryName")
        //     .select("publishers.name as publisherName")
        //     .select("authors.last_name as authorLastName")
        //     .select("authors.first_name as authorFirstName")
        // let results:IBookDetail[] = [];
        // books.forEach(book=>{
        //     results.push(Book.getQueryJson(book));
        // });
        // return response.json(results);

        const books = await Book
            .query()
            .select("id", "title", "category_id", "publisher_id", "author_id")
            .preload("category", (profileQuery) => {
                profileQuery
                    .select("id","name")
            })
            .preload("publisher", (profileQuery) => {
                profileQuery
                    .select("id","name")
            })
            .preload("author", (profileQuery) => {
                profileQuery
                    .select("id","last_name", "first_name")
            }).toSQL();
        console.log(books);
        return response.json(books);
    }

    async show ({ params, response }) {
        const book = await Book.find(params.id)
        //console.log("output", Book!.getJson());
        if (book) {
            return response.json(book.getJson())
        } else {
            response.status(404).json({"message":'not found'});
        }
    }
        
    /**
     * Create Book
     * @param param0 
     * @returns 
     */
    async store ({ request, response }) {
        let title = request.input("title");
        let categoryId = request.input("categoryId");
        let publisherId = request.input("publisherId");
        let authorId = request.input("authorId");
        const book = await Book.create({title, categoryId, publisherId, authorId})
        return response.json(book)
    }

    /**
     * Update Book
     * @param param0 
     * @returns 
     */
    async update ({ params, request, response }) {
        let title = request.input("title");
        let categoryId = request.input("categoryId");
        let publisherId = request.input("publisherId");
        let authorId = request.input("authorId");
        let book = await Book.find(params.id);
        if (book) {
            book.title = title;
            book.categoryId = categoryId;
            book.publisherId = publisherId;
            book.authorId = authorId;
            await book?.save();
            return response.json(book);
        } else {
            response.status(404).json({"message":'not found'});
        }
    }
    
    async destroy ({ params, response }) {
        const book = await Book.find(params.id);
        book?.delete()
        response.status(204).json({"message":"deleted"});
    }

}