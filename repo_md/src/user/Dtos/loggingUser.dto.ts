import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './createUser.dto';
import { PickType } from '@nestjs/mapped-types';

export class loggingUserDto extends PickType(CreateUserDto, [
  'user_name',
  'password',
] as const) {
  @IsNotEmpty({ message: 'El usuario es requerido' })
  @IsString({ message: 'Credenciales invalidas' })
  user_name: string;
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'Credenciales invalidas' })
  password: string;
}
