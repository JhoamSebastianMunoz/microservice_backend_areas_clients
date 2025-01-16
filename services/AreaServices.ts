import AreaRepository from '../repositories/AreaRepository';
import Area from '../Dto/AreaDto';
import GetArea from '../Dto/GetAreaDto';
import DeleteArea from '../Dto/DeleteAreaDto';
import UpdateArea from '../Dto/UpdateAreaDto';

class AreaService {
    
    static async register_area(area: Area) {
        return await AreaRepository.add(area);
    }
    static async getAreas(){
        return await AreaRepository.getAll();
    }
    static async getArea(getArea : GetArea){
        return await AreaRepository.get(getArea);
    }
    static async deleteArea(deleteArea: DeleteArea){
        return await AreaRepository.delete(deleteArea);
    } 
    static async updateArea(updateArea: UpdateArea){
        return await AreaRepository.update(updateArea);
        }
};

export default AreaService;