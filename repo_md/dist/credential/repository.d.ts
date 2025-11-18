import { Credential } from 'src/entities/credential.entity';
import { Repository } from 'typeorm';
import { UpdateCredentialDto } from './Dtos/updateCredential.dto';
export declare class CredentialRepository {
    private readonly credentialDataBase;
    constructor(credentialDataBase: Repository<Credential>);
    getAllCredentialsRepository(): Promise<Credential[]>;
    getCredentialByNameRepository(user_name: string): Promise<Credential | null>;
    getCredentialByIdRepository(uuid: string): Promise<Credential | null>;
    findByUserName(user_name: string): Promise<Credential | null>;
    updateCredentialRepository(credential: Credential, dto: UpdateCredentialDto): Promise<Credential>;
}
