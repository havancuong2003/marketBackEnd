import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Activity } from './entities/activity.entity';
import { DITokens } from 'src/di';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ActivityController],
  providers: [ActivityService,{ provide : DITokens.ActivityService, useClass: ActivityService }],
})
export class ActivityModule {}
