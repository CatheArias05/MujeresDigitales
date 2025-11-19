import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { OrderStatus } from 'src/enum/order_status.enum';
import { PayMethod } from 'src/enum/pay_method.enum';
import { PayStatus } from 'src/enum/pay_status.enum';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderDetailItemDto } from './order-detail-item.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  total?: number;

  @IsOptional()
  @IsNumber()
  shipping_price?: number;

  @IsOptional()
  @IsEnum(PayMethod)
  pay_method?: PayMethod;

  @IsOptional()
  @IsEnum(OrderStatus)
  order_status?: OrderStatus;

  @IsOptional()
  @IsEnum(PayStatus)
  pay_status?: PayStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetailItemDto)
  order_details?: OrderDetailItemDto[];
}
