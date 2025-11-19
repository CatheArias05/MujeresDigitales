import { ApiProperty } from '@nestjs/swagger';

export class UpdateBusinessDto {
  @ApiProperty({ description: 'UUID del negocio a actualizar' })
  uuid: string;

  @ApiProperty({ description: 'UUID del usuario propietario', required: false })
  uuid_usuario?: string;

  @ApiProperty({
    description: 'Código de registro del negocio',
    required: false,
  })
  registro_negocio?: string;

  @ApiProperty({ description: 'Nombre del negocio', required: false })
  nombre_negocio?: string;

  @ApiProperty({ description: 'Ubicación del negocio', required: false })
  ubicacion?: string;

  @ApiProperty({ description: 'Descripción del negocio', required: false })
  descripcion?: string;

  @ApiProperty({
    description: 'Estado del negocio (activo/inactivo)',
    required: false,
  })
  estado?: boolean;
}
