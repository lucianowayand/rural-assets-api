import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { IsAuthorizedGuard } from './guards/is-authorized.guard';
import { IsStaffGuard } from './guards/is-staff.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, IsAuthorizedGuard, IsStaffGuard],
  exports: [IsAuthorizedGuard, IsStaffGuard, JwtModule],
})
export class UserModule {}
