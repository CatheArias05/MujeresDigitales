import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailDataBase: Repository<OrderDetail>,
    @InjectRepository(Order) private readonly orderDataBase: Repository<Order>,
    @InjectRepository(Product)
    private readonly productDataBase: Repository<Product>,
  ) {}

  async create(CreateOrderDetailDto: CreateOrderDetailDto) {
    const order = await this.orderDataBase.findOne({
      where: { uuid_order: CreateOrderDetailDto.uuid_order },
    });

    const product = await this.productDataBase.findOne({
      where: { uuid: CreateOrderDetailDto.uuid_product },
    });

    if (!order || !product) {
      throw new NotFoundException('Orden o Producto no encontrado');
    }

    const newOrderProduct = this.orderDetailDataBase.create({
      ...CreateOrderDetailDto,
      order: order,
      product: product,
    });

    return this.orderDetailDataBase.save(newOrderProduct);
  }

  async getAll() {
    return await this.orderDetailDataBase.find({ relations: ['uuid_order'] });
  }

  async getById(id: string) {
    return await this.orderDetailDataBase.findOne({
      where: { uuid_order_detail: id },
      relations: ['uuid_order'],
    });
  }

  async update(id: string, data: OrderDetail) {
    const updateData = { ...data };
    if (data.product.uuid) {
      const product = await this.productDataBase.findOne({
        where: { uuid: data.product.uuid },
      });
      if (!product) throw new NotFoundException('Producto no encontrado');
      updateData.product = product;
    }
    if (data.order.uuid_order) {
      const order = await this.orderDataBase.findOne({
        where: { uuid_order: data.order.uuid_order },
      });
      if (!order) throw new NotFoundException('Orden no encontrada');
      updateData.order = order;
    }

    await this.orderDetailDataBase.update(
      { uuid_order_detail: id },
      updateData,
    );
    return await this.orderDetailDataBase.findOne({
      where: { uuid_order_detail: id },
      relations: ['order', 'product'],
    });
  }

  async remove(id: string): Promise<void> {
    const res = await this.orderDetailDataBase.delete({
      uuid_order_detail: id,
    });
    if (res.affected === 0)
      throw new NotFoundException(`OrderDetail ${id} not found`);
  }
}
