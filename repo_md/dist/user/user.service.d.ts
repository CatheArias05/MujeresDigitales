import { CreateUserDto } from './Dtos/createUser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';
import { UserRepository } from './repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getAllUsersService(): Promise<import("../entities/user.entity").User[]>;
    getUserByNameService(name: string): Promise<import("../entities/user.entity").User[]>;
    getUserByIdService(uuid: string): Promise<import("../entities/user.entity").User>;
    createUserService(dto: CreateUserDto): Promise<string>;
    updateUserService(dto: UpdateUserDto): Promise<{
        message: string;
    }>;
    deleteUserService(uuid: string): Promise<{
        message: string;
    }>;
}
