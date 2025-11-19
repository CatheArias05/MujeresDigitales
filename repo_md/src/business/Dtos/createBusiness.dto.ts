import { ApiProperty } from '@nestjs/swagger';

export class CreatedBusinessDto {
  @ApiProperty({ description: 'UUID del usuario propietario del negocio' })
  uuid_usuario: string;

  @ApiProperty({
    description: 'Código de registro único del negocio',
    example: 'REG-0001',
  })
  registro_negocio: string;

  @ApiProperty({
    description: 'Nombre del negocio',
    example: 'Mercado La Esperanza',
  })
  nombre_negocio: string;

  @ApiProperty({
    description: 'Ubicación del negocio',
    required: false,
    example: 'Tunja, Boyacá',
  })
  ubicacion?: string;

  @ApiProperty({ description: 'Descripción del negocio', required: false })
  descripcion?: string;
}