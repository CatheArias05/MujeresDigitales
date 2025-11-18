import { CredentialService } from './credential.service';
import { UpdateCredentialDto } from './Dtos/updateCredential.dto';
export declare class CredentialController {
    private readonly credentialService;
    constructor(credentialService: CredentialService);
    getAllCredentials(): Promise<import("../entities/credential.entity").Credential[]>;
    getCredentialByName(user_name: string): Promise<import("../entities/credential.entity").Credential | null>;
    getCredentialById(uuid: string): Promise<import("../entities/credential.entity").Credential | null>;
    updateCredential(dto: UpdateCredentialDto): Promise<import("../entities/credential.entity").Credential>;
}
