import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../interface/role';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column({ enum: Role, default: Role.Particular })
  role: Role;
}
