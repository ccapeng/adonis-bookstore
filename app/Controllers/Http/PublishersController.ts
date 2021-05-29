import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publisher,{IPublisher} from 'App/Models/Publisher';

export default class PublishersController {

    public async index (context: HttpContextContract) {
        const {response} = context;
        const publishers = await Publisher.all()
        let results: IPublisher[] = [];
        publishers.forEach((Publisher:Publisher)=>{
            results.push(Publisher.getListJson())
        });
        return response.json(results);
    }

    public async show ({ params, response }) {
        const publisher = await Publisher.find(params.id)
        //console.log("output", Publisher!.getJson());
        if (publisher) {
            return response.json(publisher.getJson())
        } else {
            response.status(404).json({"message":'not found'});
        }
    }
        
    /**
     * Create Publisher
     * @param param0 
     * @returns 
     */
    async store ({ request, response }) {
        let name = request.input("name");
        const publisher = await Publisher.create({name})
        return response.json(publisher)
    }

    /**
     * Update Publisher
     * @param param0 
     * @returns 
     */
    async update ({ params, request, response }) {
        let name = request.input("name");
        let publisher = await Publisher.find(params.id);
        if (publisher) {
            publisher.name = name;
            await publisher?.save();
            return response.json(publisher);
        } else {
            response.status(404).json({"message":'not found'});
        }
    }
    
    async destroy ({ params, response }) {
        const publisher = await Publisher.find(params.id);
        publisher?.delete()
        response.status(204).send('deleted');
    }


}
