import { IsNumber, IsOptional, IsPositive, IsUUID, Min } from 'class-validator';

export class CreateOrderDetailDto {
  @IsUUID()
  uuid_order: string;

  @IsNumber()
  @Min(1)
  cant: number;

  @IsOptional()
  @IsNumber()
  iva_applied?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsNumber()
  @IsPositive()
  subtotal: number;
}
