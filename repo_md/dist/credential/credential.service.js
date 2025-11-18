"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialService = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("./repository");
let CredentialService = class CredentialService {
    credentialRepository;
    constructor(credentialRepository) {
        this.credentialRepository = credentialRepository;
    }
    getAllCredentialsService() {
        return this.credentialRepository.getAllCredentialsRepository();
    }
    getCredentialByNameService(user_name) {
        return this.credentialRepository.getCredentialByNameRepository(user_name);
    }
    getCredentialByIdService(uuid) {
        return this.credentialRepository.getCredentialByIdRepository(uuid);
    }
    async updateCredentialService(dto) {
        const credential = await this.credentialRepository.getCredentialByIdRepository(dto.uuid);
        if (!credential) {
            throw new common_1.NotFoundException('Credencial no encontrada');
        }
        if (dto.user_name) {
            const existing = await this.credentialRepository.findByUserName(dto.user_name);
            if (existing) {
                throw new common_1.ConflictException('El nombre de usuario ya está en uso');
            }
        }
        return await this.credentialRepository.updateCredentialRepository(credential, dto);
    }
};
exports.CredentialService = CredentialService;
exports.CredentialService = CredentialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.CredentialRepository])
], CredentialService);
//# sourceMappingURL=credential.service.js.map