"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonConfig = void 0;
const winston = require("winston");
const nest_winston_1 = require("nest-winston");
exports.winstonConfig = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
    ],
};
//# sourceMappingURL=winston.config.js.map