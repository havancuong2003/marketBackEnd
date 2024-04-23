import {
  Controller,
  Get,
  Inject,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Body,
  Post,
  UploadedFiles,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';

import { IAccountService } from './interface-account.service';
import { DITokens } from 'src/di';
import { AccessTokenGuard } from 'src/guard';
import { Request } from 'express';
import { UpdateAccountDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/helper';
import { extname } from 'path';


import { UpdatePasswordDto } from './dto/update-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('/account')
export class AccountController {
  constructor(
    @Inject(DITokens.AccountService)
    private readonly accountService: IAccountService,
  ) {}
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Req() req: Request) {
    console.log(typeof req);
    console.log('find all : ', req.user['id']);
    return this.accountService.findAll();
  }
  @UseGuards(AccessTokenGuard)

  @Get("/show-information")
  showInformation(@Req() req:Request){
    return this.accountService.informationAccount(req.user['id']);
  }
  @UseGuards(AccessTokenGuard)
  @Post("/update-username")
  updateUserName(@Req() req:Request, @Body() updateUserDto: UpdateAccountDto){
    if(!updateUserDto.username){
      throw new  BadRequestException('username is required');
    }
    return this.accountService.updateUserName(
      req.user['id'],
      updateUserDto.username,
    );
  }
  @UseGuards(AccessTokenGuard)

  @Post('/update-password')
  async updatePassWord(
    @Req() req: Request,
    @Body() updateUserPassDto: UpdatePasswordDto,
  ) {
    if (!updateUserPassDto.password) {
      
       throw new  BadRequestException('password is required');
      
    }
    if (updateUserPassDto.password !== updateUserPassDto.repassword) {
      throw new  BadRequestException('password and repassword not match');
    }

    if (updateUserPassDto.curentpassword === updateUserPassDto.password) {
      throw new  BadRequestException('password not change');
    }

    if (updateUserPassDto.password !== updateUserPassDto.repassword) {
      throw new  BadRequestException('password is required');
    }

    return this.accountService.updatePassWord(
      req.user['id'],
      updateUserPassDto.password,
      updateUserPassDto.curentpassword,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Post('/upload-avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageConfig('avatar'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowExtArr = ['.png', '.jpg', '.jpeg'];
        if (!allowExtArr.includes(ext)) {
          req.fileValidationError =
            'File not allow . Accepted file ext are : ' +
            allowExtArr.toString();
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 5MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  async uploadFile(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    console.log('upload file: ', file);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File not found');

   
    }
    return await this.accountService.updateAvatar(
      req.user['id'],
      file.destination + '/' + file.filename,
    );
  }
}
