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

@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Get('getCredentials')
  getAllCredentials() {
    return this.credentialService.getAllCredentialsService();
  }

  @Get('getCredentialByName')
  getCredentialByName(@Query('user_name') user_name: string) {
    return this.credentialService.getCredentialByNameService(user_name);
  }

  @Get('getCredentialById/:uuid')
  getCredentialById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.credentialService.getCredentialByIdService(uuid);
  }

  @Patch('updateCredential')
  updateCredential(@Body() dto: UpdateCredentialDto) {
    return this.credentialService.updateCredentialService(dto);
  }
}
