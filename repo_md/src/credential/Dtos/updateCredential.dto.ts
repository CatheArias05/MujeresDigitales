import { IsOptional, IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class UpdateCredentialDto {
  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  user_name?: string;

  @IsOptional()
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  password?: string;

  @IsNotEmpty({ message: 'El UUID de la credencial es obligatorio' })
  @IsUUID('4', { message: 'Debe ser un UUID válido' })
  uuid: string;
}
