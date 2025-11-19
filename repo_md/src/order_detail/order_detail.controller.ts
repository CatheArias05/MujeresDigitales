import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  create(@Body() CreateOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailService.create(CreateOrderDetailDto);
  }

  @Get()
  getAll() {
    return this.orderDetailService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderDetailService.getById(id);
  }

  @Get(':id')
  getByOrderId(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderDetailService.getByOrderId(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderDetailService.remove(id);
  }
}
