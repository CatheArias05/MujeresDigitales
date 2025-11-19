import { IsNumber, IsOptional, IsPositive, Min, IsUUID } from 'class-validator';

export class OrderDetailItemDto {
  @IsOptional()
  @IsUUID()
  uuid_order_detail?: string;

  @IsOptional()
  @IsUUID()
  uuid_product?: string;

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
