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
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ThueCongViecDto } from './dto';
import { ThuecongviecService } from './thuecongviec.service';

@ApiTags('ThueCongViec')
@Controller('')
export class ThuecongviecController {
  constructor(
    private thuecongviecService: ThuecongviecService,
    private jwt: JwtService,
  ) {}

  //get thue-cong-viec
  @Get('thue-cong-viec')
  async getThueCongViec(): Promise<any> {
    return await this.thuecongviecService.getThueCongViec();
  }

  // postBinhLuan
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: ThueCongViecDto })
  @Post('thue-cong-viec')
  async postThueCongViec(
    @Req() req: Request,
    @Body() body: ThueCongViecDto,
  ): Promise<any> {
    let dataToken = req.user;
    let { thuecongviec_id, congviec_id, nguoidung_id, ngay_thue, hoan_thanh } =
      body;
    let checkUser = await this.thuecongviecService.postThueCongViec(
      thuecongviec_id,
      congviec_id,
      nguoidung_id,
      ngay_thue,
      hoan_thanh,
      dataToken,
    );
    if (checkUser.check) {
      return checkUser.data;
    } else {
      throw new HttpException(checkUser.data, HttpStatus.BAD_REQUEST);
    }
  }

  //get thue-cong-viec theo id
  @ApiParam({ name: 'id' })
  @Get('thue-cong-viec/:id')
  async getThueCongViecID(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let checkDataThueCongViec =
      await this.thuecongviecService.getThueCongViecID(id);

    if (checkDataThueCongViec.check) {
      return checkDataThueCongViec.data;
    } else {
      throw new HttpException(
        checkDataThueCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //put loai-cong-viec
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ThueCongViecDto })
  @Put('thue-cong-viec/:id')
  async putLoaiCongViec(
    @Req() req: Request,
    @Body() body: ThueCongViecDto,
  ): Promise<any> {
    const { id } = req.params;
    const {
      congviec_id,
      nguoidung_id,
      ngay_thue,
      hoan_thanh,
    } = body;
    let dataToken = req.user;
    let checkDataThueCongViec = await this.thuecongviecService.putThueCongViec(
      id,
      congviec_id,
      nguoidung_id,
      ngay_thue,
      hoan_thanh,
      dataToken
    );
    if (checkDataThueCongViec.check) {
      return checkDataThueCongViec.data;
    } else {
      throw new HttpException(
        checkDataThueCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

    //delete thue-cong-viec
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiParam({name:'id'})
    @Delete('thue-cong-viec/:id')
    async deleteThueCongViec(@Req() req:Request):Promise<any>{
      const { id } = req.params;
      let dataToken = req.user
      let checkDataThueCongViec =  await this.thuecongviecService.deleteThueCongViec(id,dataToken);
      if (checkDataThueCongViec.check) {
        return checkDataThueCongViec.data;
      } else {
        throw new HttpException(checkDataThueCongViec.data, HttpStatus.BAD_REQUEST);
      }
    }
}
