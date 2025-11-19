import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dtos/createUser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Role } from 'src/decorators/roles.decorator';
import { Roles } from 'src/enum/roles.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/auth.guard';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos' })
  @ApiBearerAuth()
  @Get('getAllUsers')
  @UseGuards(AuthGuard, RolesGuard)
  getAllUsers() {
    return this.userService.getAllUsersService();
  }

  @ApiOperation({ summary: 'Buscar usuario por nombre' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiBearerAuth()
  @Get('getUserByName')
  @UseGuards(AuthGuard)
  getUserByName(@Query('name') name: string) {
    return this.userService.getUserByNameService(name);
  }

  @ApiOperation({ summary: 'Obtener usuario por UUID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'No encontrado' })
  @ApiParam({ name: 'uuid' })
  @ApiBearerAuth()
  @Get('getUserById/:uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  getUserById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.getUserByIdService(uuid);
  }

  @ApiOperation({ summary: 'Crear usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  @ApiBearerAuth()
  @Post('createUser')
  @Role(Roles.ADMIN)
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUserService(dto);
  }

  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiBearerAuth()
  @Patch('updateUser')
  @UseGuards(AuthGuard)
  @Role(Roles.CUSTOMER)
  updateUser(@Body() dto: UpdateUserDto) {
    return this.userService.updateUserService(dto);
  }

  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiParam({ name: 'uuid' })
  @ApiBearerAuth()
  @Delete('deleteUser/:uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  deleteUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.deleteUserService(uuid);
  }
}
