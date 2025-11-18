import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { OrderStatus } from 'src/enum/order_status.enum';
import { PayMethod } from 'src/enum/pay_method.enum';
import { PayStatus } from 'src/enum/pay_status.enum';

export class CreateOrderDto {
  @IsUUID()
  user_id: string;

  @IsNumber()
  @IsPositive()
  total: number;

  @IsNumber()
  shipping_price: number;

  @IsEnum(PayMethod)
  pay_method: PayMethod;

  @IsOptional()
  @IsEnum(OrderStatus)
  order_status?: OrderStatus;

  @IsOptional()
  @IsEnum(PayStatus)
  pay_status?: PayStatus;
}
