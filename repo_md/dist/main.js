"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const loggerGlobal_1 = require("./middlewares/loggerGlobal");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(loggerGlobal_1.loggerGlobal);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.PORT ?? 3002);
    console.log(`Servidor corriendo en el puerto 3002`);
}
bootstrap();
//# sourceMappingURL=main.js.map