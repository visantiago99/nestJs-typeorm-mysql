import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserPostsParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/utils/types/user-types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  fetchUsers() {
    return this.userRepository.find({
      relations: ['profile', 'posts'],
    });
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

  async createUserProfile(id: number, userData: CreateUserProfileParams) {
    const user = await this.userRepository.findOneBy({
      id: id,
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    const newProfile = this.profileRepository.create(userData);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserPosts(id: number, userData: CreateUserPostsParams) {
    const user = await this.userRepository.findOneBy({
      id: id,
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    const newPost = this.postRepository.create({
      ...userData,
      user,
    });
    const savedPost = await this.postRepository.save(newPost);
    return savedPost;
  }
}
