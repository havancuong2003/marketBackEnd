
import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    // UsersModule,
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
//   providers: [AuthService],
//   controllers: [AuthController],
//   exports: [AuthService],
})
export class AuthModule {}