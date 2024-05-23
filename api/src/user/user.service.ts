import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './interface/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Role } from './interface/role';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser({
    firstName,
    lastName,
    email,
    role,
  }: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new NotFoundException('Cet utilisateur existe déjà');
    }

    const newUser = this.userRepository.create({
      firstName,
      lastName,
      email,
      role,
    });
    return this.userRepository.save(newUser);
  }

  async getAllUsers(role?: Role): Promise<UserEntity[]> {
    if (role && !Object.values(Role).includes(role)) {
      throw new BadRequestException(
        'Le rôle spécifié est invalide. Les rôles valides sont : particular, admin, entreprise, recommender',
      );
    }

    let criteria = {};

    if (role) {
      criteria = { role };
    }

    const users = await this.userRepository.find({ where: criteria });

    if (users.length === 0) {
      throw new NotFoundException('Aucun utilisateur avec ce rôle trouvé');
    }

    return users;
  }
}
