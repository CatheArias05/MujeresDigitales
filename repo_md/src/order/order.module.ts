import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
  exports: [OrderRepository],
})
export class OrderModule {}
