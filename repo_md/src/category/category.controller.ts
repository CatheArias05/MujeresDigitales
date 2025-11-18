import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Categorías')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //Ruta para obtener las categorías activas:
  @ApiOperation({ summary: 'Obtener las categorías activas' })
  @ApiResponse({
    status: 200,
    description: 'Categorías obtenidas exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No hay categorías activas.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @Get('active')
  getActiveCategories() {
    return this.categoriesService.getActiveCategories();
  }

  //Ruta para crear una nueva categoría:
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en el DTO.' })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una categoría con el nombre ingresado.',
  })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({
    status: 403,
    description: 'No autorizado para realizar esta acción.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Post('createCategory')
  postCreateCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.postCreateCategory(createCategoryDto);
  }

  //Ruta para actualizar una categoría:
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos en el DTO.' })
  @ApiResponse({
    status: 404,
    description: 'No existe una categoría con el UUID ingresado.',
  })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({
    status: 403,
    description: 'No autorizado para realizar esta acción.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Put('updateCategory')
  putUpdateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.putUpdateCategory(updateCategoryDto);
  }

  //Ruta para activar una categoría:
  @ApiOperation({ summary: 'Activar una categoría' })
  @ApiResponse({
    status: 200,
    description: 'Categoría activada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'UUID inválido, formato incorrecto.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe una categoría con el UUID ingresado.',
  })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({
    status: 403,
    description: 'No autorizado para realizar esta acción.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Put('activate/:uuid')
  activateCategory(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.categoriesService.activateCategory(uuid);
  }

  //Ruta para desactivar una categoría:
  @ApiOperation({ summary: 'Desactivar una categoría' })
  @ApiResponse({
    status: 200,
    description: 'Categoría eliminada exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'UUID inválido, formato incorrecto.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe una categoría activa con el UUID ingresado.',
  })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({
    status: 403,
    description: 'No autorizado para realizar esta acción.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Delete('deleteCategory/:uuid')
  deleteCategory(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.categoriesService.deleteCategory(uuid);
  }
}
