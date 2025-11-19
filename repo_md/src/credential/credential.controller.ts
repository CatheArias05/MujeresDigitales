import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { CredentialService } from './credential.service';
import { UpdateCredentialDto } from './Dtos/updateCredential.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Credenciales')
@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @ApiOperation({ summary: 'Listar credenciales' })
  @ApiResponse({ status: 200, description: 'Listado obtenido' })
  @Get('getCredentials')
  getAllCredentials() {
    return this.credentialService.getAllCredentialsService();
  }

  @ApiOperation({ summary: 'Buscar credencial por usuario' })
  @ApiResponse({ status: 200, description: 'Credencial encontrada' })
  @Get('getCredentialByName')
  getCredentialByName(@Query('user_name') user_name: string) {
    return this.credentialService.getCredentialByNameService(user_name);
  }

  @ApiOperation({ summary: 'Obtener credencial por UUID' })
  @ApiResponse({ status: 200, description: 'Credencial encontrada' })
  @ApiResponse({ status: 404, description: 'No encontrada' })
  @ApiParam({ name: 'uuid' })
  @Get('getCredentialById/:uuid')
  getCredentialById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.credentialService.getCredentialByIdService(uuid);
  }

  @ApiOperation({ summary: 'Actualizar credencial' })
  @ApiResponse({ status: 200, description: 'Credencial actualizada' })
  @Patch('updateCredential')
  updateCredential(@Body() dto: UpdateCredentialDto) {
    return this.credentialService.updateCredentialService(dto);
  }
}
