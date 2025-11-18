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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const credential_entity_1 = require("../entities/credential.entity");
const bcrypt = require("bcrypt");
let UserRepository = class UserRepository {
    userDataBase;
    credentialDataBase;
    constructor(userDataBase, credentialDataBase) {
        this.userDataBase = userDataBase;
        this.credentialDataBase = credentialDataBase;
    }
    async getAllUsersRepository() {
        return await this.userDataBase.find({ relations: ['credential'] });
    }
    async getUserByNameRepository(name) {
        return await this.userDataBase.find({
            where: { name },
        });
    }
    async getUserByIdRepository(uuid) {
        return await this.userDataBase.findOne({
            where: { uuid_user: uuid },
            relations: ['credential'],
        });
    }
    async findCredentialByUserName(user_name) {
        return await this.credentialDataBase.findOne({ where: { user_name } });
    }
    async findUserByEmail(email) {
        return await this.userDataBase.findOne({ where: { email } });
    }
    async createUserRepository(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newCredential = this.credentialDataBase.create({
            user_name: dto.user_name,
            password: hashedPassword,
            creation_date: new Date(),
            update_date: new Date(),
            last_access_date: new Date(),
        });
        await this.credentialDataBase.save(newCredential);
        const newUser = this.userDataBase.create({
            cedula: dto.cedula,
            name: dto.name,
            last_name: dto.last_name,
            phone: dto.phone,
            email: dto.email,
            address: dto.address,
            role: 'customer',
            status: true,
            creation_date: new Date(),
            update_date: new Date(),
            credential: newCredential,
        });
        await this.userDataBase.save(newUser);
        console.log(`Perfil creado: ${newUser.uuid_user}`);
        return 'Usuario creado con éxito';
    }
    async updateUserRepository(existingUser, dto) {
        if (dto.name) {
            existingUser.name = dto.name;
        }
        if (dto.last_name) {
            existingUser.last_name = dto.last_name;
        }
        if (dto.address) {
            existingUser.address = dto.address;
        }
        if (dto.email) {
            existingUser.email = dto.email;
        }
        existingUser.update_date = new Date();
        existingUser.credential.update_date = new Date();
        await this.userDataBase.save(existingUser);
        return { message: 'Usuario actualizado exitosamente' };
    }
    async deleteUserRepository(user) {
        await this.credentialDataBase.remove(user.credential);
        await this.userDataBase.remove(user);
        return { message: 'Usuario eliminado correctamente' };
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(credential_entity_1.Credential)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserRepository);
//# sourceMappingURL=repository.js.map