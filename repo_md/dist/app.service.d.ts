import { OnModuleInit } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Credential } from './entities/credential.entity';
export declare class AppService {
    getHello(): string;
}
export declare class DataLouderUser implements OnModuleInit {
    private readonly userDataBase;
    private readonly credentialDataBase;
    constructor(userDataBase: Repository<User>, credentialDataBase: Repository<Credential>);
    onModuleInit(): Promise<void>;
}
