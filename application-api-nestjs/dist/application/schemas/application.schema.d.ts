import { Document } from 'mongoose';
export declare class Application extends Document {
    name: string;
    domain: string;
    description?: string;
    apiKey: string;
    status: string;
    ownerId: string;
}
export declare const ApplicationSchema: import("mongoose").Schema<Application, import("mongoose").Model<Application, any, any, any, Document<unknown, any, Application> & Application & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Application, Document<unknown, {}, import("mongoose").FlatRecord<Application>> & import("mongoose").FlatRecord<Application> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
