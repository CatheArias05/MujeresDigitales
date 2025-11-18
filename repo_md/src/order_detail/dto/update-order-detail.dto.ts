import { IsOptional, IsNumber, IsUUID, Min, IsPositive } from 'class-validator';

export class UpdateOrderDetailDto {
  @IsOptional()
  @IsUUID()
  uuid_order?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  cant?: number;

  @IsOptional()
  @IsNumber()
  iva_applied?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  subtotal?: number;
}
