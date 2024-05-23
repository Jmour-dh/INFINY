import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './interface/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Role } from './interface/role';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  signupUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(@Query('role') role?: Role): Promise<UserEntity[]> {
    if (role) {
      return this.userService.getAllUsers(role);
    } else {
      return this.userService.getAllUsers();
    }
  }
}
