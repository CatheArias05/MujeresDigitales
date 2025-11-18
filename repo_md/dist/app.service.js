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
exports.DataLouderUser = exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const credential_entity_1 = require("./entities/credential.entity");
const fs = require("fs");
const bcrypt = require("bcrypt");
let AppService = class AppService {
    getHello() {
        return 'Te doy la bienvenida a AgroMarket';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
let DataLouderUser = class DataLouderUser {
    userDataBase;
    credentialDataBase;
    constructor(userDataBase, credentialDataBase) {
        this.userDataBase = userDataBase;
        this.credentialDataBase = credentialDataBase;
    }
    async onModuleInit() {
        const userCount = await this.userDataBase.count();
        if (userCount === 0) {
            console.log('Creando datos iniciales de User en la base de datos ...');
            const querryRunner = this.userDataBase.manager.connection.createQueryRunner();
            await querryRunner.connect();
            await querryRunner.startTransaction();
            try {
                const rawData = fs.readFileSync('./src/utils/data.json', 'utf-8');
                const user = JSON.parse(rawData);
                await Promise.all(user.map(async (user) => {
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
                }));
                await querryRunner.commitTransaction();
                console.log('Datos de User cargados exitosamente.');
            }
            catch (error) {
                console.error('Error al cargar los datos de User:', error);
                await querryRunner.rollbackTransaction();
            }
            finally {
                await querryRunner.release();
            }
        }
        else {
            console.log('Los datos de User ya existen en la base de datos.');
        }
    }
};
exports.DataLouderUser = DataLouderUser;
exports.DataLouderUser = DataLouderUser = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(credential_entity_1.Credential)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DataLouderUser);
//# sourceMappingURL=app.service.js.map