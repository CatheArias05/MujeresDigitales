import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Detalles de Orden')
@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderService: OrderDetailService) {}

  @ApiOperation({ summary: 'Crear detalle de orden' })
  @ApiResponse({ status: 201, description: 'Detalle creado' })
  @Post()
  create(@Body() body: CreateOrderDetailDto) {
    return this.orderService.create(body as any);
  }

  @ApiOperation({ summary: 'Listar detalles de orden' })
  @ApiResponse({ status: 200, description: 'Listado obtenido' })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Obtener detalle por UUID' })
  @ApiResponse({ status: 200, description: 'Detalle encontrado' })
  @ApiResponse({ status: 404, description: 'Detalle no encontrado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar detalle de orden' })
  @ApiResponse({ status: 200, description: 'Detalle actualizado' })
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateOrderDetailDto) {
    return this.orderService.update(id, body as any);
  }

  @ApiOperation({ summary: 'Eliminar detalle de orden' })
  @ApiResponse({ status: 200, description: 'Detalle eliminado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
