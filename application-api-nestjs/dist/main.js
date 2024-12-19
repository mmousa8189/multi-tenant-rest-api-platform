"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const compression = require("compression");
const helmet_1 = require("helmet");
const nest_winston_1 = require("nest-winston");
const winston_config_1 = require("./config/winston.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger(winston_config_1.winstonConfig),
    });
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.enableCors({
        origin: [
            'http://localhost:4200',
            'http://localhost:3000',
            ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Multi-Tenant API')
        .setDescription('Multi-tenant REST API system with admin portal')
        .setVersion('1.0')
        .addBearerAuth()
        .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' }, 'X-API-Key')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document, {
        customSiteTitle: 'Multi-Tenant API Documentation',
        customCss: '.swagger-ui .topbar { display: none }',
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map