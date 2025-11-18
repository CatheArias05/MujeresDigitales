import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from 'src/entities/user.entity';
import { UpdateOrderDto } from 'src/order/dto/updateOrder.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order) private readonly orderDataBase: Repository<Order>,
    @InjectRepository(User) private readonly userDataBase: Repository<User>,
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
    orderExisting = { ...orderExisting, ...updateOrderDto };
    await this.orderDataBase.save(orderExisting);
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
