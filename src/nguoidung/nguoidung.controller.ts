import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { NguoiDungDto } from 'src/auth/dto';
import { NguoidungService } from './nguoidung.service';

@ApiTags('NguoiDung')
@Controller('')
export class NguoidungController {
  constructor(private nguoidungService: NguoidungService) {}

  //get nguoi-dung
  @Get('nguoidung')
  async getNguoiDung(): Promise<any> {
    return this.nguoidungService.getNguoiDung();
  }

  //post nguoi-dung
  @ApiBody({ type: NguoiDungDto })
  @Post('nguoidung')
  async postNguoiDung(@Body() body: NguoiDungDto): Promise<NguoiDungDto> {
    const {
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification,
    } = body;
    let checkSignup = await this.nguoidungService.postNguoiDung(
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification,
    );
    if (checkSignup.check) {
      return checkSignup.data, checkSignup.message;
    } else {
      throw new HttpException(checkSignup.data, HttpStatus.BAD_REQUEST);
    }
  }

  //get nguoi-dung theo id
  @ApiParam({ name: 'id' })
  @Get('nguoidung/:id')
  async getNguoiDungID(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let checkNguoiDung = await this.nguoidungService.getNguoiDungID(id);
    if (checkNguoiDung.check) {
      return checkNguoiDung.data;
    } else {
      throw new HttpException(checkNguoiDung.data, HttpStatus.BAD_REQUEST);
    }
  }

  //delete nguoi-dung
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @Delete('nguoidung/:id')
  async deleteNguoiDung(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let checkDataNguoiDung = await this.nguoidungService.deleteNguoiDung(id);
    if (checkDataNguoiDung.check) {
      return checkDataNguoiDung.data;
    } else {
      throw new HttpException(checkDataNguoiDung.data, HttpStatus.BAD_REQUEST);
    }
  }

  //put nguoi-dung
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @ApiBody({ type: NguoiDungDto })
  @Put('nguoidung/:id')
  async putNguoiDung(
    @Req() req: Request,
    @Body() body: NguoiDungDto,
  ): Promise<any> {
    const { id } = req.params;
    const {
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification,
    } = body;
    let checkDataNguoiDung = await this.nguoidungService.putNguoiDung(
      id,
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification,
    );
    if (checkDataNguoiDung.check) {
      return checkDataNguoiDung.data;
    } else {
      throw new HttpException(
        checkDataNguoiDung.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
