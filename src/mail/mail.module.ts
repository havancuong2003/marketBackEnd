import { MailerModule } from '@nestjs-modules/mailer';
import {  Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
//@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      imports:[ConfigModule],
      useFactory: async(configService : ConfigService) : Promise<any> => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<string>('MAIL_PORT'),
          secure: false,  
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: configService.get<string>('MAIL_FROM'),
        }
      }),
    }),
    
  ],
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}
