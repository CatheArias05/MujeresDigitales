import { EstadoEnvio } from '../../entities/shipping.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShippingDto {
  @ApiProperty({ description: 'UUID del envío a actualizar' })
  uuid: string;

  @ApiProperty({ description: 'UUID de la orden de compra', required: false })
  uuid_orden_de_compra?: string;

  @ApiProperty({ description: 'Fecha de emisión ISO 8601', required: false })
  fecha_emision?: string;

  @ApiProperty({ description: 'Fecha de entrega ISO 8601', required: false })
  fecha_entrega?: string;

  @ApiProperty({
    description: 'Estado del envío',
    required: false,
    enum: EstadoEnvio,
  })
  estado_envio?: EstadoEnvio;
}