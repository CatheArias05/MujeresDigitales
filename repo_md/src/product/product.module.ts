import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { BusinessModule } from 'src/business/business.module';
import { CategoriesModule } from 'src/category/category.module';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { ProductsRepository } from './repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoriesModule,
    BusinessModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
