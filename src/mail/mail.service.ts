import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import Mail from 'nodemailer/lib/mailer';
import { IMailService } from './interface-mail.service';

@Injectable()
export class MailService implements IMailService {
  constructor(
    private readonly configService: ConfigService,
    private mailer: MailerService,
  ) {}

  async sendUserConfirmation(mailTo: string) {
    try {
      //   const trans = nodemailer.createTransport({
      //     host: this.configService.get('MAIL_HOST'),
      //     port: this.configService.get('MAIL_PORT'),
      //     secure: false,
      //     auth: {
      //       user: this.configService.get('MAIL_USER'),
      //       pass: this.configService.get('MAIL_PASS'),
      //     },
      //   });
      const option: Mail.Options = {
        from: 'trung@example.com' ?? {
          name: this.configService.get('APP_NAME'),
          address: this.configService.get('DEFAULT_MAIL_FROM'),
        },
        to: mailTo,
        subject: 'Welcome to ' + this.configService.get('APP_NAME'),
        html: '<h1>Test send mail</h1>',
      };
      console.log(option);
      const result = await this.mailer.sendMail({
        from: 'trung@example.com' ?? {
          name: this.configService.get('APP_NAME'),
          address: this.configService.get('DEFAULT_MAIL_FROM'),
        },
        to: mailTo,
        subject: 'Welcome to ' + this.configService.get('APP_NAME'),
        html: '<h1>Test send mail</h1>',
      });
      return result;
    } catch (error) {
      console.log('ERROR FROM MAIL : ', error);
    }
  }
}
