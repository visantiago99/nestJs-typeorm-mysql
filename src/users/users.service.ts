import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types/user-types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  fetchUsers() {
    return this.userRepository.find();
  }

  createUser(userData: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userData,
      createdAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  updateUser(userData: UpdateUserParams) {
    const { id, ...userDetails } = userData;
    return this.userRepository.update(
      {
        id: id,
      },
      {
        ...userDetails,
      },
    );
  }

  deleteUser(id: number) {
    return this.userRepository.delete({
      id: id,
    });
  }
}
