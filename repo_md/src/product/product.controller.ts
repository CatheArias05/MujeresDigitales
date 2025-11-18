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
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

@ApiTags('Productos')
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  //Ruta para obtener un producto por UUID:
  @ApiOperation({ summary: 'Obtener un producto por UUID' })
  @ApiResponse({
    status: 200,
    description: 'Producto obtenido exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un producto con el UUID ingresado.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.PRODUCER)
  @Get('getProduct/:uuid')
  getProductById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.productsService.getProductById(uuid);
  }

  //Ruta para obtener productos por su categoría:
  @ApiOperation({ summary: 'Obtener productos filtrados por categoría' })
  @ApiResponse({
    status: 200,
    description: 'Productos obtenidos exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe una categoría con el UUID ingresado.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @Get('category/:categoryUuid')
  getProductsByCategory(
    @Param('categoryUuid', ParseUUIDPipe) categoryUuid: string,
  ) {
    return this.productsService.getProductsByCategory(categoryUuid);
  }

  //Ruta para crear un producto:
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en el DTO.' })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un producto con el código o nombre ingresado.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN, UserRoles.PRODUCER)
  @Post('createProduct')
  postCreateProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.postCreateProduct(createProductDto);
  }

  //Ruta para actualizar un producto:
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos en el DTO.' })
  @ApiResponse({
    status: 404,
    description: 'No existe un producto con el UUID ingresado.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un producto con el código o nombre ingresado.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN, UserRoles.PRODUCER)
  @Put('updateProduct')
  putUpdateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.productsService.putUpdateProduct(updateProductDto);
  }

  //Ruta para desactivar un producto:
  @ApiOperation({ summary: 'Desactivar un producto' })
  @ApiResponse({
    status: 200,
    description: 'Producto desactivado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'UUID inválido.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un producto activo con el UUID ingresado.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN, UserRoles.PRODUCER)
  @Delete('deleteProduct/:uuid')
  deleteProduct(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.productsService.deleteProduct(uuid);
  }
}
