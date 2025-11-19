import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipping, EstadoEnvio } from '../entities/shipping.entity';

@Injectable()
export class ShippingRepository {
  constructor(
    @InjectRepository(Shipping)
    private readonly shippingDataBase: Repository<Shipping>,
  ) {}

  async getAllShippingRepository() {
    return await this.shippingDataBase.find();
  }

  async getShippingByIdRepository(uuid: string) {
    return await this.shippingDataBase.findOne({ where: { uuid } });
  }

  async getShippingByEstadoRepository(estado: EstadoEnvio) {
    return await this.shippingDataBase.find({
      where: { estado_envio: estado },
    });
  }

  async getShippingByOrderUuid(orderUuid: string) {
    return await this.shippingDataBase.findOne({
      where: { uuid_orden_de_compra: orderUuid },
    });
  }

  async createShippingRepository(createShippingDto: any) {
    const newShipping = this.shippingDataBase.create({
      uuid_orden_de_compra: createShippingDto.uuid_orden_de_compra,
      fecha_emision: createShippingDto.fecha_emision ?? new Date(),
      fecha_entrega: createShippingDto.fecha_entrega ?? null,
      estado_envio: createShippingDto.estado_envio ?? EstadoEnvio.PENDIENTE,
    });
    await this.shippingDataBase.save(newShipping);
    return {
      message: `Envio creado para la orden ${newShipping.uuid_orden_de_compra}`,
    };
  }

  async putUpdateShippingRepository(
    shippingExisting: Shipping,
    updateShippingDto: any,
  ) {
    if (updateShippingDto.uuid_orden_de_compra) {
      shippingExisting.uuid_orden_de_compra =
        updateShippingDto.uuid_orden_de_compra;
    }
    if (updateShippingDto.fecha_emision) {
      shippingExisting.fecha_emision = new Date(
        updateShippingDto.fecha_emision,
      );
    }
    if (updateShippingDto.fecha_entrega) {
      shippingExisting.fecha_entrega = new Date(
        updateShippingDto.fecha_entrega,
      );
    }
    if (updateShippingDto.estado_envio) {
      shippingExisting.estado_envio = updateShippingDto.estado_envio;
    }
    shippingExisting.fecha_actualizacion = new Date();
    await this.shippingDataBase.save(shippingExisting);
    return { message: 'Envio actualizado exitosamente' };
  }

  async deleteShippingRepository(shippingExisting: Shipping) {
    await this.shippingDataBase.remove(shippingExisting);
    return { message: `El envio ${shippingExisting.uuid} fue eliminado` };
  }
}