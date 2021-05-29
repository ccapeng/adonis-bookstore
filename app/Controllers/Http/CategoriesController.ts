import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category, {ICategory} from "App/Models/Category"

export default class CategoriesController {

    public async index (context: HttpContextContract) {
        const {response} = context;
        const categories = await Category.all()
        let results: ICategory[] = [];
        categories.forEach((category:Category)=>{
            results.push(category.getListJson())
        });
        return response.json(results);
    }

    public async show ({ params, response }) {
        const category = await Category.find(params.id)
        //console.log("output", category!.getJson());
        if (category) {
            return response.json(category.getJson())
        } else {
            response.status(404).json({"message":'not found'});
        }
    }
        
    /**
     * Create Category
     * @param param0 
     * @returns 
     */
    async store ({ request, response }) {
        let name = request.input("name");
        const category = await Category.create({name})
        return response.json(category)
    }

    /**
     * Update Category
     * @param param0 
     * @returns 
     */
    async update ({ params, request, response }) {
        let name = request.input("name");
        let category = await Category.find(params.id);
        if (category) {
            category.name = name;
            await category?.save();
            return response.json(category);
        } else {
            response.status(404).json({"message":'not found'});
        }
    }
    
    async destroy ({ params, response }) {
        const category = await Category.find(params.id);
        category?.delete()
        response.status(204).send('deleted');
    }

}
