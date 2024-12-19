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
exports.ApiKeyStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_headerapikey_1 = require("passport-headerapikey");
const application_service_1 = require("../../application/application.service");
let ApiKeyStrategy = class ApiKeyStrategy extends (0, passport_1.PassportStrategy)(passport_headerapikey_1.HeaderAPIKeyStrategy, 'api-key') {
    constructor(applicationService) {
        super({ header: 'X-API-Key', prefix: '' }, false, async (apiKey, done) => {
            if (!apiKey) {
                return done(new common_1.UnauthorizedException('API key is missing'), null);
            }
            try {
                const application = await this.applicationService.findByApiKey(apiKey);
                if (!application) {
                    return done(new common_1.UnauthorizedException('Invalid API key'), null);
                }
                return done(null, application);
            }
            catch (err) {
                console.error('API Key validation error:', err);
                return done(new common_1.UnauthorizedException('Invalid API key'), null);
            }
        });
        this.applicationService = applicationService;
    }
};
exports.ApiKeyStrategy = ApiKeyStrategy;
exports.ApiKeyStrategy = ApiKeyStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], ApiKeyStrategy);
//# sourceMappingURL=api-key.strategy.js.map