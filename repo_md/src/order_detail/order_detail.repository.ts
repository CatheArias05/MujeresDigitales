import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { Repository, DeepPartial } from 'typeorm';
import { Product } from 'src/entities/products.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailDataBase: Repository<OrderDetail>,
    @InjectRepository(Order) private readonly orderDataBase: Repository<Order>,
  ) {}

  async create(detail: Partial<OrderDetail>): Promise<OrderDetail> {
    const payload: Partial<OrderDetail> = { ...detail };
    const d: any = detail as any;
    if (typeof d.uuid_order === 'string') {
      const orderRef = new Order();
      orderRef.uuid_order = d.uuid_order;
      (payload as any).uuid_order = orderRef;
    }
    if (typeof d.uuid_product === 'string') {
      const productRef = new Product();
      productRef.uuid = d.uuid_product;
      (payload as any).product = productRef;
      delete (payload as any).uuid_product;
    }
    const entity = this.orderDetailDataBase.create(
      payload as DeepPartial<OrderDetail>,
    );
    return await this.orderDetailDataBase.save(entity);
  }

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailDataBase.find({
      relations: ['uuid_order', 'product'],
    });
  }

  async findById(id: string): Promise<OrderDetail> {
    const found = await this.orderDetailDataBase.findOne({
      where: { uuid_order_detail: id },
      relations: ['uuid_order', 'product'],
    });
    if (!found) throw new NotFoundException(`OrderDetail ${id} not found`);
    return found;
  }

  async update(id: string, data: Partial<OrderDetail>): Promise<OrderDetail> {
    const payload: Partial<OrderDetail> = { ...data };
    const d: any = data as any;
    if (typeof d.uuid_order === 'string') {
      const orderRef = new Order();
      orderRef.uuid_order = d.uuid_order;
      (payload as any).uuid_order = orderRef;
    }
    if (typeof d.uuid_product === 'string') {
      const productRef = new Product();
      productRef.uuid = d.uuid_product;
      (payload as any).product = productRef;
      delete (payload as any).uuid_product;
    }
    await this.orderDetailDataBase.update(
      { uuid_order_detail: id },
      payload as QueryDeepPartialEntity<OrderDetail>,
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
