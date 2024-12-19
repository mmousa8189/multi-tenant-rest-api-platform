import { Model } from 'mongoose';
import { Application } from './schemas/application.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
export declare class ApplicationService {
    private applicationModel;
    constructor(applicationModel: Model<Application>);
    create(createApplicationDto: CreateApplicationDto, userId: string): Promise<Application>;
    findAll(userId: string): Promise<Application[]>;
    findOne(id: string, userId: string): Promise<Application>;
    update(id: string, updateApplicationDto: CreateApplicationDto, userId: string): Promise<Application>;
    remove(id: string, userId: string): Promise<void>;
    findByApiKey(apiKey: string): Promise<Application>;
}
