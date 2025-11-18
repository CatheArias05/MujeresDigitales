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
// import { RolesGuard } from 'src/auth/Guards/roles.guard';
// import { Role } from 'src/decorators/roles.decorator';
// import { Roles } from 'src/enum/roles.enum';
// import { AuthGuard } from 'src/auth/Guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAllUsers')
  // @UseGuards(AuthGuard, RolesGuard)
  getAllUsers() {
    return this.userService.getAllUsersService();
  }

  @Get('getUserByName')
  // @UseGuards(AuthGuard)
  getUserByName(@Query('name') name: string) {
    return this.userService.getUserByNameService(name);
  }

  @Get('getUserById/:uuid')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Role(Roles.ADMIN)
  getUserById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.getUserByIdService(uuid);
  }

  @Post('createUser')
  // @Role(Roles.ADMIN)
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUserService(dto);
  }

  @Patch('updateUser')
  // @UseGuards(AuthGuard)
  // @Role(Roles.USER)
  updateUser(@Body() dto: UpdateUserDto) {
    return this.userService.updateUserService(dto);
  }

  @Delete('deleteUser/:uuid')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Role(Roles.ADMIN)
  deleteUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.deleteUserService(uuid);
  }
}
