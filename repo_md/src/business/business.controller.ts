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
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreatedBusinessDto } from './Dtos/createBusiness.dto';
import { UpdateBusinessDto } from './Dtos/updateBusiness.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Negocios')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @ApiOperation({ summary: 'Obtener todos los negocios' })
  @ApiResponse({ status: 200, description: 'Negocios obtenidos exitosamente.' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Nombre del negocio a buscar',
  })
  @Get('getAllBusiness')
  getAllBusiness(@Query('name') name?: string) {
    if (name) {
      return this.businessService.getBusinessByNameService(name);
    }
    return this.businessService.getAllBusinessService();
  }

  @ApiOperation({ summary: 'Obtener un negocio por su ID' })
  @ApiResponse({ status: 200, description: 'Negocio obtenido exitosamente.' })
  @ApiParam({ name: 'uuid', description: 'ID del negocio' })
  @Get('getBusinessById/:uuid')
  getBusinessById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.businessService.getBusinessByIdService(uuid);
  }

  @ApiOperation({ summary: 'Obtener perfil de negocio' })
  @ApiResponse({ status: 200, description: 'Perfil obtenido exitosamente.' })
  @ApiParam({ name: 'uuid', description: 'ID del negocio' })
  @Get('profile/:uuid')
  getBusinessProfile(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.businessService.getBusinessProfileService(uuid);
  }

  @ApiOperation({ summary: 'Crear un nuevo negocio' })
  @ApiResponse({ status: 201, description: 'Negocio creado exitosamente.' })
  @Post('createBusiness')
  postCreateBusiness(@Body() createBusinessDto: CreatedBusinessDto) {
    return this.businessService.postCreateBusinessService(createBusinessDto);
  }

  @ApiOperation({ summary: 'Actualizar un negocio' })
  @ApiResponse({
    status: 200,
    description: 'Negocio actualizado exitosamente.',
  })
  @Put('updateBusiness')
  putUpdateBusiness(@Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.putUpdateBusinessService(updateBusinessDto);
  }

  @ApiOperation({ summary: 'Eliminar (soft-delete) un negocio' })
  @ApiResponse({ status: 200, description: 'Negocio eliminado exitosamente.' })
  @ApiParam({ name: 'uuid', description: 'ID del negocio' })
  @Delete('deleteBusiness/:uuid')
  deleteBusiness(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.businessService.deleteBusinessService(uuid);
  }
}