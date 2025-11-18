import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Credential } from 'src/entities/credential.entity';
import { CreateUserDto } from './Dtos/createUser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';
export declare class UserRepository {
    private readonly userDataBase;
    private readonly credentialDataBase;
    constructor(userDataBase: Repository<User>, credentialDataBase: Repository<Credential>);
    getAllUsersRepository(): Promise<User[]>;
    getUserByNameRepository(name: string): Promise<User[]>;
    getUserByIdRepository(uuid: string): Promise<User | null>;
    findCredentialByUserName(user_name: string): Promise<Credential | null>;
    findUserByEmail(email: string): Promise<User | null>;
    createUserRepository(dto: CreateUserDto): Promise<string>;
    updateUserRepository(existingUser: User, dto: UpdateUserDto): Promise<{
        message: string;
    }>;
    deleteUserRepository(user: User): Promise<{
        message: string;
    }>;
}
