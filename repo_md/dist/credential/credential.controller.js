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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialController = void 0;
const common_1 = require("@nestjs/common");
const credential_service_1 = require("./credential.service");
const updateCredential_dto_1 = require("./Dtos/updateCredential.dto");
let CredentialController = class CredentialController {
    credentialService;
    constructor(credentialService) {
        this.credentialService = credentialService;
    }
    getAllCredentials() {
        return this.credentialService.getAllCredentialsService();
    }
    getCredentialByName(user_name) {
        return this.credentialService.getCredentialByNameService(user_name);
    }
    getCredentialById(uuid) {
        return this.credentialService.getCredentialByIdService(uuid);
    }
    updateCredential(dto) {
        return this.credentialService.updateCredentialService(dto);
    }
};
exports.CredentialController = CredentialController;
__decorate([
    (0, common_1.Get)('getCredentials'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CredentialController.prototype, "getAllCredentials", null);
__decorate([
    (0, common_1.Get)('getCredentialByName'),
    __param(0, (0, common_1.Query)('user_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CredentialController.prototype, "getCredentialByName", null);
__decorate([
    (0, common_1.Get)('getCredentialById/:uuid'),
    __param(0, (0, common_1.Param)('uuid', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CredentialController.prototype, "getCredentialById", null);
__decorate([
    (0, common_1.Patch)('updateCredential'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateCredential_dto_1.UpdateCredentialDto]),
    __metadata("design:returntype", void 0)
], CredentialController.prototype, "updateCredential", null);
exports.CredentialController = CredentialController = __decorate([
    (0, common_1.Controller)('credential'),
    __metadata("design:paramtypes", [credential_service_1.CredentialService])
], CredentialController);
//# sourceMappingURL=credential.controller.js.map