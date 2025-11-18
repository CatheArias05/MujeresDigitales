import { Module } from '@nestjs/common';
import { OrderDetailController } from './order_detail.controller';
import { OrderDetailService } from './order_detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { Order } from 'src/entities/order.entity';
import { OrderDetailRepository } from './order_detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService, OrderDetailRepository],
  exports: [OrderDetailRepository],
})
export class OrderDetailModule {}
