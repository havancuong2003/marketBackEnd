import { CreateActivityDto, UpdateActivityDto } from "./dto";

export interface IActivityService {
    create(createActivityDto: CreateActivityDto);
    findAll();
    findOne(id: number);
    update(id: number, updateActivityDto: UpdateActivityDto);
    remove(id: number);
}