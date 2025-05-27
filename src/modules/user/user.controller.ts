import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IsStaffGuard } from './guards/is-staff.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserMapper } from './user.mapper';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: UserDto,
  })
  @UseGuards(IsStaffGuard)
  async register(@Body() user: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userService.register(user);

    return UserMapper.fromEntityToDto(newUser);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: LoginResponseDto,
  })
  async login(@Body() payload: LoginDto): Promise<LoginResponseDto> {
    const { authToken, user } = await this.userService.login(
      payload.email,
      payload.password,
    );

    return {
      authToken,
      user: UserMapper.fromEntityToDto(user),
    };
  }
}
