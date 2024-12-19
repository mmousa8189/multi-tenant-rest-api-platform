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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationSchema = exports.Application = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Application = class Application extends mongoose_2.Document {
};
exports.Application = Application;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the application' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Application.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Domain of the application' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Application.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the application' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Auto-generated API key' }),
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], Application.prototype, "apiKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status of the application' }),
    (0, mongoose_1.Prop)({ default: 'active' }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Owner ID of the application' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Application.prototype, "ownerId", void 0);
exports.Application = Application = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Application);
exports.ApplicationSchema = mongoose_1.SchemaFactory.createForClass(Application);
//# sourceMappingURL=application.schema.js.map