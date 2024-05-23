import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from './role';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsEnum(Role)
  role: Role;
}
