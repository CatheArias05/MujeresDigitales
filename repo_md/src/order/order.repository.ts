import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from 'src/entities/user.entity';
import { UpdateOrderDto } from 'src/order/dto/updateOrder.dto';
import { UpdateOrderDetailDto } from 'src/order_detail/dto/update-order-detail.dto';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { OrderDetailService } from 'src/order_detail/order_detail.service';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order) private readonly orderDataBase: Repository<Order>,
    @InjectRepository(User) private readonly userDataBase: Repository<User>,
    private readonly OrderDetailService: OrderDetailService,
  ) {}

  async createOrder(CreateOrderDto: CreateOrderDto) {
    const user = await this.userDataBase.findOne({
      where: { uuid_user: CreateOrderDto.user_id },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const newOrder = this.orderDataBase.create({
      ...CreateOrderDto,
      user: user,
    });
    return this.orderDataBase.save(newOrder);
  }

  async getAll() {
    return this.orderDataBase.find({ relations: ['order_details'] });
  }

  async getById(id: string) {
    const found = await this.orderDataBase.findOne({
      where: { uuid_order: id },
      relations: ['order_details'],
    });
    if (!found) throw new NotFoundException(`Order ${id} not found`);
    return found;
  }

  async update(orderExisting: Order, updateOrderDto: UpdateOrderDto) {
    // merge basic fields
    const { order_details, ...orderFields } = updateOrderDto;
    orderExisting = { ...orderExisting, ...orderFields };
    const orderSaved = await this.orderDataBase.save(orderExisting);

    // If order_details are provided, sync them: create new, update existing, delete removed
    if (Array.isArray(order_details)) {
      const existingDetails = orderSaved.order_details ?? [];

      const incomingIds = new Set<string>();

      for (const item of order_details) {
        if (item.uuid_order_detail) {
          // update existing
          incomingIds.add(item.uuid_order_detail);
          // do not allow changing order on detail here
          const { uuid_order_detail, ...detailUpdate } = item;
          await this.OrderDetailService.update(
            uuid_order_detail,
            detailUpdate,
          );
        } else {
          // create new and link to order
          if (!item.uuid_product) {
            throw new Error(
              'uuid_product is required when creating order detail',
            );
          }
          await this.orderDetailRepository.create({
            uuid_order: orderExisting.uuid_order,
            uuid_product: item.uuid_product,
            cant: item.cant,
            iva_applied: item.iva_applied,
            discount: item.discount,
            subtotal: item.subtotal,
          });
        }
      }

      // delete details that are in DB but not in incoming payload
      for (const existing of existingDetails) {
        if (!incomingIds.has(existing.uuid_order_detail)) {
          await this.orderDetailRepository.remove(existing.uuid_order_detail);
        }
      }
    }

    console.log(`Se actualizó la orden: ${orderExisting.uuid_order}`);
    return {
      message: `Orden actualizada en la base de datos: ${orderExisting.uuid_order}`,
    };
  }

  async delete(id: string) {
    const res = await this.orderDataBase.delete({ uuid_order: id });
    if (res.affected === 0)
      throw new NotFoundException(`Order ${id} not found`);
  }
}
