import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailDataBase: Repository<OrderDetail>,
    @InjectRepository(Order) private readonly orderDataBase: Repository<Order>,
  ) {}

  async create(detail: Partial<OrderDetail>): Promise<OrderDetail> {
    const entity = this.orderDetailDataBase.create(detail);
    return this.orderDetailDataBase.save(entity);
  }

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailDataBase.find({ relations: ['uuid_order'] });
  }

  async findById(id: string): Promise<OrderDetail> {
    const found = await this.orderDetailDataBase.findOne({
      where: { uuid_order_detail: id },
      relations: ['uuid_order'],
    });
    if (!found) throw new NotFoundException(`OrderDetail ${id} not found`);
    return found;
  }

  async update(id: string, data: Partial<OrderDetail>): Promise<OrderDetail> {
    await this.orderDetailDataBase.update(
      { uuid_order_detail: id },
      data as any,
    );
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const res = await this.orderDetailDataBase.delete({
      uuid_order_detail: id,
    });
    if (res.affected === 0)
      throw new NotFoundException(`OrderDetail ${id} not found`);
  }
}
