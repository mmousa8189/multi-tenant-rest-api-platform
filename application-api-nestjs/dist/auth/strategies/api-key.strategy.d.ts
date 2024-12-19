import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { ApplicationService } from '../../application/application.service';
declare const ApiKeyStrategy_base: new (...args: any[]) => HeaderAPIKeyStrategy;
export declare class ApiKeyStrategy extends ApiKeyStrategy_base {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
}
export {};
