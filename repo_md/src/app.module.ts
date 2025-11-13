import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { CredentialModule } from './credential/credential.module';
import { CredentialController } from './credential/credential.controller';
import { CredentialService } from './credential/credential.service';
import { BusinessModule } from './business/business.module';
import { BusinessController } from './business/business.controller';
import { BusinessService } from './business/business.service';
import { ProductModule } from './product/product.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { CategoryModule } from './category/category.module';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CartModule } from './cart/cart.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { OrderModule } from './order/order.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { ShippingModule } from './shipping/shipping.module';
import { ShippingController } from './shipping/shipping.controller';
import { ShippingService } from './shipping/shipping.service';
import typeorm from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm') ?? {},
    }),
    UserModule,
    CredentialModule,
    BusinessModule,
    ProductModule,
    CategoryModule,
    CartModule,
    OrderModule,
    ShippingModule,
  ],
  controllers: [
    AppController,
    UserController,
    CredentialController,
    BusinessController,
    ProductController,
    CategoryController,
    CartController,
    OrderController,
    ShippingController,
  ],
  providers: [
    AppService,
    UserService,
    CredentialService,
    BusinessService,
    ProductService,
    CategoryService,
    CartService,
    OrderService,
    ShippingService,
  ],
})
export class AppModule {}
