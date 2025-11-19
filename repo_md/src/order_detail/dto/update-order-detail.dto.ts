import { IsOptional, IsNumber, IsUUID, Min, IsPositive } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDetailDto {
  @ApiPropertyOptional({ description: 'UUID de la orden asociada' })
  @IsOptional()
  @IsUUID()
  uuid_order?: string;

  @ApiPropertyOptional({ description: 'UUID del producto' })
  @IsOptional()
  @IsUUID()
  uuid_product?: string;

  @ApiPropertyOptional({ description: 'Cantidad', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  cant?: number;

  @ApiPropertyOptional({ description: 'IVA aplicado' })
  @IsOptional()
  @IsNumber()
  iva_applied?: number;

  @ApiPropertyOptional({ description: 'Descuento aplicado' })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional({ description: 'Subtotal', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  subtotal?: number;
}
