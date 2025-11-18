import { UpdateCredentialDto } from './Dtos/updateCredential.dto';
import { CredentialRepository } from './repository';
export declare class CredentialService {
    private readonly credentialRepository;
    constructor(credentialRepository: CredentialRepository);
    getAllCredentialsService(): Promise<import("../entities/credential.entity").Credential[]>;
    getCredentialByNameService(user_name: string): Promise<import("../entities/credential.entity").Credential | null>;
    getCredentialByIdService(uuid: string): Promise<import("../entities/credential.entity").Credential | null>;
    updateCredentialService(dto: UpdateCredentialDto): Promise<import("../entities/credential.entity").Credential>;
}
