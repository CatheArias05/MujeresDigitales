import { UserService } from './user.service';
import { CreateUserDto } from './Dtos/createUser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<import("../entities/user.entity").User[]>;
    getUserByName(name: string): Promise<import("../entities/user.entity").User[]>;
    getUserById(uuid: string): Promise<import("../entities/user.entity").User>;
    createUser(dto: CreateUserDto): Promise<string>;
    updateUser(dto: UpdateUserDto): Promise<{
        message: string;
    }>;
    deleteUser(uuid: string): Promise<{
        message: string;
    }>;
}
