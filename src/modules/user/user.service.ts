import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {
    this.userRepository = userRepository;
  }

  findById(
    id: string,
    transaction?: EntityManager,
  ): Promise<UserEntity | null> {
    if (!transaction) {
      return this.userRepository.manager.transaction((t) =>
        this.findById(id, t),
      );
    }

    return transaction.findOne(UserEntity, { where: { id } });
  }

  findByEmail(
    email: string,
    transaction?: EntityManager,
  ): Promise<UserEntity | null> {
    if (!transaction) {
      return this.userRepository.manager.transaction((t) =>
        this.findByEmail(email, t),
      );
    }

    return transaction.findOne(UserEntity, {
      where: {
        email,
      },
    });
  }

  async register(
    user: CreateUserDto,
    transaction?: EntityManager,
  ): Promise<UserEntity> {
    if (!transaction) {
      return this.userRepository.manager.transaction((t) =>
        this.register(user, t),
      );
    }

    const existingUser = await this.findByEmail(user.email, transaction);

    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hash = await bcrypt.hash(user.password, 8);

    const newUser = new UserEntity();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = hash;

    return transaction.save(UserEntity, newUser);
  }

  async login(
    email: string,
    password: string,
    transaction?: EntityManager,
  ): Promise<{ authToken: string; user: UserEntity }> {
    if (!transaction) {
      return this.userRepository.manager.transaction((t) =>
        this.login(email, password, t),
      );
    }

    const user = await this.findByEmail(email, transaction);

    if (!user) {
      console.error('User not found', email);
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      console.error('Invalid password');
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync(
      JSON.stringify(UserMapper.fromEntityToDto(user)),
      {
        secret: process.env.SECRET,
      },
    );

    return { authToken: token, user };
  }
}
