import { IsOptional, IsNumber, IsUUID, Min, IsPositive } from 'class-validator';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/products.entity';

export class UpdateOrderDetailDto {
  @IsOptional()
  @IsUUID()
  uuid_order?: string;

  @IsUUID()
  uuid_product?: string;

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

  product: Product;
  order: Order;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  subtotal?: number;
}
