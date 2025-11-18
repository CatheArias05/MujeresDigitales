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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("./repository");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAllUsersService() {
        return this.userRepository.getAllUsersRepository();
    }
    async getUserByNameService(name) {
        const users = await this.userRepository.getUserByNameRepository(name);
        if (!users.length)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return users;
    }
    async getUserByIdService(uuid) {
        const user = await this.userRepository.getUserByIdRepository(uuid);
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return user;
    }
    async createUserService(dto) {
        const existingUserName = await this.userRepository.findCredentialByUserName(dto.user_name);
        const existingEmail = await this.userRepository.findUserByEmail(dto.email);
        if (existingUserName || existingEmail)
            throw new common_1.BadRequestException('El usuario o correo ya existen');
        return await this.userRepository.createUserRepository(dto);
    }
    async updateUserService(dto) {
        const userExisting = await this.userRepository.getUserByIdRepository(dto.uuid_user);
        if (!userExisting)
            throw new common_1.NotFoundException('Usuario no encontrado');
        if (dto.email) {
            const emailExisting = await this.userRepository.findUserByEmail(dto.email);
            if (emailExisting)
                throw new common_1.ConflictException('Este correo ya se encuentra registrado');
        }
        if (dto.user_name) {
            const userNameExisting = await this.userRepository.findCredentialByUserName(dto.user_name);
            if (userNameExisting) {
                throw new common_1.ConflictException('Este nombre de usuario ya está en uso');
            }
        }
        return await this.userRepository.updateUserRepository(userExisting, dto);
    }
    async deleteUserService(uuid) {
        const user = await this.userRepository.getUserByIdRepository(uuid);
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return await this.userRepository.deleteUserRepository(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map