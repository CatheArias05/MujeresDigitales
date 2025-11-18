import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { OrderStatus } from 'src/enum/order_status.enum';
import { PayMethod } from 'src/enum/pay_method.enum';
import { PayStatus } from 'src/enum/pay_status.enum';

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
}
