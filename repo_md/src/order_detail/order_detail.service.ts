import { Injectable } from '@nestjs/common';
import { OrderDetailRepository } from './order_detail.repository';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Injectable()
export class OrderDetailService {
  constructor(private readonly orderRepository: OrderDetailRepository) {}

  create(detail: Partial<OrderDetail>) {
    return this.orderRepository.create(detail);
  }

  findAll() {
    return this.orderRepository.findAll();
  }

  findOne(id: string) {
    return this.orderRepository.findById(id);
  }

  update(id: string, data: UpdateOrderDetailDto) {
    return this.orderRepository.update(id, data);
  }

  remove(id: string) {
    return this.orderRepository.remove(id);
  }
}
