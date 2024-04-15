import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { ActivityModule } from './activity/activity.module';
import { HeroModule } from './hero/hero.module';
import { HistoryTransModule } from './history-trans/history-trans.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/entities/account.entity';
import { Activity } from './activity/entities/activity.entity';
import { Hero } from './hero/entities/hero.entity';
import { HistoryTran } from './history-trans/entities/history-tran.entity';
import { AuthModule } from './auth';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'), 
        database: configService.get('DB_DATABASE_NAME'), 
        entities: [
          Account,Activity,Hero,HistoryTran
        ],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AccountModule,
    ActivityModule,
    HeroModule,
    HistoryTransModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
