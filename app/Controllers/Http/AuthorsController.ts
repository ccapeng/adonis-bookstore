import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author,{IAuthor} from 'App/Models/Author';

export default class AuthorsController {

    public async index (context: HttpContextContract) {
        const {response} = context;
        const authors = await Author.all()
        let results: IAuthor[] = [];
        authors.forEach((author:Author)=>{
            results.push(author.getListJson())
        });
        return response.json(results);
    }

    public async show ({ params, response }) {
        const author = await Author.find(params.id)
        //console.log("output", Author!.getJson());
        if (author) {
            return response.json(author.getJson())
        } else {
            response.status(404).json({"message":'not found'});
        }
    }
        
    /**
     * Create Author
     * @param param0 
     * @returns 
     */
    async store ({ request, response }) {
        let lastName = request.input("lastName");
        let firstName = request.input("firstName");
        const author = await Author.create({lastName, firstName})
        return response.json(author)
    }

    /**
     * Update Author
     * @param param0 
     * @returns 
     */
    async update ({ params, request, response }) {
        let lastName = request.input("lastName");
        let firstName = request.input("firstName");
        let author = await Author.find(params.id);
        if (author) {
            author.lastName = lastName;
            author.firstName = firstName;
            await author?.save();
            return response.json(author);
        } else {
            response.status(404).json({"message":'not found'});
        }
    }
    
    async destroy ({ params, response }) {
        const author = await Author.find(params.id);
        author?.delete()
        response.status(204).json({"message":"deleted"});
    }


}
