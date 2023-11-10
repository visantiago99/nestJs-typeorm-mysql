import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsers() {
    const users = await this.userService.fetchUsers();
    return users;
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const createdUser = await this.userService.createUser(userData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPass } = createdUser;
    return userWithoutPass;
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ) {
    await this.userService.updateUser({
      username: userData.username,
      password: userData.password,
      id,
    });
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
