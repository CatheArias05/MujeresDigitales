import { EstadoEnvio } from '../../entities/shipping.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatedShippingDto {
  @ApiProperty({ description: 'UUID de la orden de compra asociada' })
  uuid_orden_de_compra: string;

  @ApiProperty({
    description: 'Fecha de emisión en formato ISO 8601',
    required: false,
    example: '2025-01-15T10:00:00Z',
  })
  fecha_emision?: string;

  @ApiProperty({
    description: 'Fecha de entrega en formato ISO 8601',
    required: false,
    example: '2025-01-20T16:30:00Z',
  })
  fecha_entrega?: string;

  @ApiProperty({
    description: 'Estado del envío',
    required: false,
    enum: EstadoEnvio,
  })
  estado_envio?: EstadoEnvio;
}
