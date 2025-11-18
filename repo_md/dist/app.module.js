"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const credential_module_1 = require("./credential/credential.module");
const credential_controller_1 = require("./credential/credential.controller");
const credential_service_1 = require("./credential/credential.service");
const business_module_1 = require("./business/business.module");
const business_controller_1 = require("./business/business.controller");
const business_service_1 = require("./business/business.service");
const product_module_1 = require("./product/product.module");
const product_controller_1 = require("./product/product.controller");
const product_service_1 = require("./product/product.service");
const category_module_1 = require("./category/category.module");
const category_controller_1 = require("./category/category.controller");
const category_service_1 = require("./category/category.service");
const cart_module_1 = require("./cart/cart.module");
const cart_controller_1 = require("./cart/cart.controller");
const cart_service_1 = require("./cart/cart.service");
const order_module_1 = require("./order/order.module");
const order_controller_1 = require("./order/order.controller");
const order_service_1 = require("./order/order.service");
const shipping_module_1 = require("./shipping/shipping.module");
const shipping_controller_1 = require("./shipping/shipping.controller");
const shipping_service_1 = require("./shipping/shipping.service");
const typeorm_1 = require("./config/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const credential_entity_1 = require("./entities/credential.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_1.default],
            }),
            typeorm_2.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => config.get('typeorm') ?? {},
            }),
            typeorm_2.TypeOrmModule.forFeature([user_entity_1.User, credential_entity_1.Credential]),
            user_module_1.UserModule,
            credential_module_1.CredentialModule,
            business_module_1.BusinessModule,
            product_module_1.ProductModule,
            category_module_1.CategoryModule,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
            shipping_module_1.ShippingModule,
        ],
        controllers: [
            app_controller_1.AppController,
            user_controller_1.UserController,
            credential_controller_1.CredentialController,
            business_controller_1.BusinessController,
            product_controller_1.ProductController,
            category_controller_1.CategoryController,
            cart_controller_1.CartController,
            order_controller_1.OrderController,
            shipping_controller_1.ShippingController,
        ],
        providers: [
            app_service_1.AppService,
            app_service_1.DataLouderUser,
            user_service_1.UserService,
            credential_service_1.CredentialService,
            business_service_1.BusinessService,
            product_service_1.ProductService,
            category_service_1.CategoryService,
            cart_service_1.CartService,
            order_service_1.OrderService,
            shipping_service_1.ShippingService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map