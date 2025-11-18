import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'La cedula es requerida' })
  @IsString({ message: 'Debe ser una cadena de caracteres' })
  cedula: string;

  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'Debe ser una cadena de caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El apellido es requerido' })
  @IsString({ message: 'Debe ser una cadena de caracteres' })
  last_name: string;

  @IsNotEmpty({ message: 'El telefono es requerido' })
  @IsString({ message: 'Debe ser una cadena de caracteres' })
  phone: string;

  @IsNotEmpty({ message: 'El correo es requerido' })
  @IsEmail({}, { message: 'Debe ser un correo valido' })
  email: string;

  @IsNotEmpty({ message: 'La direccion es requerida' })
  @IsString({ message: 'Debe ser una cadena de caracteres' })
  address: string;

  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'Debe ser una cadena de caracteres' })
  user_name: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'Debe ser una cadena de caracteres' })
  password: string;
}
