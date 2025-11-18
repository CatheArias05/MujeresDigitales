import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loggingUserDto } from 'src/user/Dtos/loggingUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('loggingUser')
  loggingUser(@Body() dto: loggingUserDto) {
    return this.authService.loggingUserService(dto);
  }
}
