import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Credential } from './entities/credential.entity';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Te doy la bienvenida a AgroMarket';
  }
}

@Injectable()
export class DataLouderUser implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userDataBase: Repository<User>,
    @InjectRepository(Credential)
    private readonly credentialDataBase: Repository<Credential>,
  ) {}

  async onModuleInit() {
    const userCount = await this.userDataBase.count();
    if (userCount === 0) {
      console.log('Creando datos iniciales de User en la base de datos ...');
      const querryRunner =
        this.userDataBase.manager.connection.createQueryRunner();
      await querryRunner.connect();
      await querryRunner.startTransaction();
      try {
        const rawData = fs.readFileSync('./src/utils/data.json', 'utf-8');
        const user = JSON.parse(rawData);

        await Promise.all(
          user.map(async (user) => {
            const newUser = this.userDataBase.create({
              cedula: user.cedula,
              name: user.name,
              last_name: user.last_name,
              phone: user.phone,
              email: user.email,
              address: user.address,
              role: user.role,
              status: user.status,
              creation_date: user.creation_date,
              update_date: user.update_date,
            });

            await querryRunner.manager.save(newUser);

            const newCredential = this.credentialDataBase.create({
              user_name: user.user_name,
              password: await bcrypt.hash(user.password, 10),
              last_access_date: user.last_access_date,
              creation_date: user.creation_date,
              update_date: user.update_date,
              user: newUser,
            });

            await querryRunner.manager.save(newCredential);
          }),
        );

        await querryRunner.commitTransaction();
        console.log('Datos de User cargados exitosamente.');
      } catch (error) {
        console.error('Error al cargar los datos de User:', error);
        await querryRunner.rollbackTransaction();
      } finally {
        await querryRunner.release();
      }
    } else {
      console.log('Los datos de User ya existen en la base de datos.');
    }
  }
}
