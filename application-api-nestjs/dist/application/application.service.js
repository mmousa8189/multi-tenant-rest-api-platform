"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const application_schema_1 = require("./schemas/application.schema");
let ApplicationService = class ApplicationService {
    constructor(applicationModel) {
        this.applicationModel = applicationModel;
    }
    async create(createApplicationDto, userId) {
        const apiKey = (0, uuid_1.v4)();
        const createdApplication = new this.applicationModel(Object.assign(Object.assign({}, createApplicationDto), { apiKey, ownerId: userId }));
        return createdApplication.save();
    }
    async findAll(userId) {
        return this.applicationModel.find({ ownerId: userId }).exec();
    }
    async findOne(id, userId) {
        const application = await this.applicationModel.findById(id).exec();
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (application.ownerId !== userId) {
            throw new common_1.UnauthorizedException();
        }
        return application;
    }
    async update(id, updateApplicationDto, userId) {
        const application = await this.findOne(id, userId);
        Object.assign(application, updateApplicationDto);
        return application.save();
    }
    async remove(id, userId) {
        const application = await this.findOne(id, userId);
        await application.deleteOne();
    }
    async findByApiKey(apiKey) {
        const application = await this.applicationModel.findOne({ apiKey }).exec();
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        return application;
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(application_schema_1.Application.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ApplicationService);
//# sourceMappingURL=application.service.js.map