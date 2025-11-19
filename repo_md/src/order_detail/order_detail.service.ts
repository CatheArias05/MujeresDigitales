import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailRepository } from './order_detail.repository';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { OrderRepository } from 'src/order/order.repository';

@Injectable()
export class OrderDetailService {
  constructor(
    private readonly orderDetailRepository: OrderDetailRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  create(CreateOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailRepository.create(CreateOrderDetailDto);
  }

  getAll() {
    return this.orderDetailRepository.getAll();
  }

  async getById(id: string) {
    const orderDetailExisting = await this.orderDetailRepository.getById(id);
    if (!orderDetailExisting) {
      throw new NotFoundException('Este detalle de orden no existe');
    }
    return orderDetailExisting;
  }

  getByOrderId(OrderId: string) {
    return this.orderRepository.getById(OrderId);
  }

  remove(id: string) {
    return this.orderDetailRepository.remove(id);
  }
}
