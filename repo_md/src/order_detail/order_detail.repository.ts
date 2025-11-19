import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { Product } from 'src/entities/products.entity';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

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

    const { cant, iva_applied, discount } = CreateOrderDetailDto;

    const totalProductsPrice = product.basePrice * cant;
    const totalIva = totalProductsPrice * ((iva_applied ?? 0) / 100);
    const totalDiscount = totalProductsPrice * ((discount ?? 0) / 100);

    const total = totalProductsPrice + totalIva - totalDiscount;

    if (CreateOrderDetailDto.subtotal !== total) {
      throw new Error(
        'Los subtotales no coinciden, hay un error en el calculo',
      );
    }

    const newOrderProduct = this.orderDetailDataBase.create({
      ...CreateOrderDetailDto,
      order: order,
      product: product,
      subtotal: total,
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

  async update(id: string, data: UpdateOrderDetailDto) {
    const updateData = { ...data };
    if (data.product.uuid) {
      const product = await this.productDataBase.findOne({
        where: { uuid: data.product.uuid },
      });
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      const { cant, iva_applied, discount } = updateData;

      const totalProductsPrice = product.basePrice * (cant ?? 1);
      const totalIva = totalProductsPrice * ((iva_applied ?? 0) / 100);
      const totalDiscount = totalProductsPrice * ((discount ?? 0) / 100);

      const total = totalProductsPrice + totalIva - totalDiscount;

      if (updateData.subtotal !== total) {
        throw new Error(
          'Los subtotales no coinciden, hay un error en el cálculo',
        );
      }
      updateData.product = product;
      updateData.subtotal = total;
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
