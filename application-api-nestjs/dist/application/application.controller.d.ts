import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './schemas/application.schema';
interface RequestWithUser extends Request {
    user: {
        userId: string;
    };
}
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    create(req: RequestWithUser, createApplicationDto: CreateApplicationDto): Promise<Application>;
    findAll(req: RequestWithUser): Promise<Application[]>;
    findOne(id: string, req: RequestWithUser): Promise<Application>;
    update(id: string, updateApplicationDto: CreateApplicationDto, req: RequestWithUser): Promise<Application>;
    remove(id: string, req: RequestWithUser): Promise<void>;
    testDomain(req: any): Promise<Partial<Application>>;
}
export {};
