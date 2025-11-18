import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { EstadoEnvio } from '../entities/shipping.entity';
import { CreatedShippingDto } from './Dtos/createShipping.dto';
import { UpdateShippingDto } from './Dtos/updateShipping.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Envios')
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @ApiOperation({ summary: 'Obtener todos los envios' })
  @ApiResponse({ status: 200, description: 'Envios obtenidos exitosamente.' })
  @ApiQuery({
    name: 'estado_envio',
    required: false,
    description: 'Estado del envio a filtrar',
  })
  @Get('getAllShipping')
  getAllShipping(@Query('estado_envio') estado_envio?: string) {
    if (estado_envio) {
      const allowed = Object.values(EstadoEnvio);
      if (!allowed.includes(estado_envio as EstadoEnvio)) {
        throw new BadRequestException('estado_envio inválido');
      }
      return this.shippingService.getShippingByEstadoService(
        estado_envio as EstadoEnvio,
      );
    }
    return this.shippingService.getAllShippingService();
  }

  @ApiOperation({ summary: 'Obtener un envio por su ID' })
  @ApiResponse({ status: 200, description: 'Envio obtenido exitosamente.' })
  @ApiParam({ name: 'uuid', description: 'ID del envio' })
  @Get('getShippingById/:uuid')
  getShippingById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.shippingService.getShippingByIdService(uuid);
  }

  @ApiOperation({ summary: 'Crear un envio' })
  @ApiResponse({ status: 201, description: 'Envio creado exitosamente.' })
  @Post('createShipping')
  postCreateShipping(@Body() createShippingDto: CreatedShippingDto) {
    return this.shippingService.postCreateShippingService(createShippingDto);
  }

  @ApiOperation({ summary: 'Actualizar un envio' })
  @ApiResponse({ status: 200, description: 'Envio actualizado exitosamente.' })
  @Put('updateShipping')
  putUpdateShipping(@Body() updateShippingDto: UpdateShippingDto) {
    return this.shippingService.putUpdateShippingService(updateShippingDto);
  }

  @ApiOperation({ summary: 'Eliminar un envio' })
  @ApiResponse({ status: 200, description: 'Envio eliminado exitosamente.' })
  @ApiParam({ name: 'uuid', description: 'ID del envio' })
  @Delete('deleteShipping/:uuid')
  deleteShipping(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.shippingService.deleteShippingService(uuid);
  }
}