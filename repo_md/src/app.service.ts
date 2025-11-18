import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Te doy la bienvenida a AgroMarket';
  }
}
