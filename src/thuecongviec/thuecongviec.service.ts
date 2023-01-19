import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ThuecongviecService {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  private prisma: PrismaClient = new PrismaClient();

  //get thue-cong-viec
  async getThueCongViec(): Promise<any> {
    let dataThueCongViec = await this.prisma.thueCongViec.findMany({});
    return {
      content: 'Lấy danh sách thuê công việc thành công',
      data: dataThueCongViec,
    };
  }

  //post thue-cong-viec
  async postThueCongViec(
    thuecongviec_id: number,
    congviec_id: number,
    nguoidung_id: number,
    ngay_thue: string,
    hoan_thanh: boolean,
    tokenData: any,
  ): Promise<any> {
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: {
        nguoidung_id: tokenData.nguoidung_id,
      },
    });
    if (checkUser) {
      let dataThueCongViec = await this.prisma.thueCongViec.create({
        data: {
          thuecongviec_id,
          congviec_id,
          ngay_thue,
          hoan_thanh,
          nguoidung_id: tokenData.nguoidung_id,
        },
      });
      return {
        check: true,
        data: { dataThueCongViec, contnent: 'Thêm thuê công việc thành công' },
      };
    } else {
      return {
        check: false,
        data: 'Token không hợp lệ hoặc chưa đăng nhập',
      };
    }
  }

  //get thue-cong-viec theo id
  async getThueCongViecID(id: string): Promise<any> {
    let dataThueCongViec = await this.prisma.thueCongViec.findFirst({
      where: {
        thuecongviec_id: +id,
      },
    });
    if (dataThueCongViec) {
      return {
        check: true,
        data: {
          content: 'Lấy danh sách thuê công việc theo id thành công',
          dataThueCongViec,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Lấy danh sách thuê công việc theo id thất bại' },
      };
    }
  }

  //put thue-cong-viec theo id
  async putThueCongViec(
    id: string,
    congviec_id: number,
    nguoidung_id: number,
    ngay_thue: string,
    hoan_thanh: boolean,
    tokenData: any,
  ): Promise<any> {
    let checkThueCongViec = await this.prisma.thueCongViec.findFirst({
      where: {
        nguoidung_id: tokenData.nguoidung_id,
        thuecongviec_id:+id
      },
    });
    if (checkThueCongViec) {
      let dataThueCongViec = await this.prisma.thueCongViec.update({
        data: {
            thuecongviec_id:+id,
            congviec_id,
            nguoidung_id: tokenData.nguoidung_id,
            ngay_thue,
            hoan_thanh
        },
        where: {
            thuecongviec_id:+id 
        },
      });
      return {
        check: true,
        data: {
          content: 'Chỉnh sửa thuê công việc theo id thành công',
          data: dataThueCongViec,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Chỉnh sửa thuê công việc thất bại ' },
      };
    }
  }

    //xóa bình luận
    async deleteThueCongViec(
        id: string,
        dataToken: any,
      ): Promise<any> {
        let checkUser = await this.prisma.thueCongViec.findFirst({
          where: {
            nguoidung_id: dataToken.nguoidung_id,
            thuecongviec_id: +id,
          },
        });
        if (!checkUser) {
          return {
            check: false,
            data: 'Xóa thất bại',
          };
        } else {
          let dataDelete = await this.prisma.thueCongViec.delete({
            where: {
              thuecongviec_id: +id,
            },
          });
          return {
            check: true,
            data: {
              content: 'Xóa thuê công việc thành công',
              dataDelete,
            },
          };
        }
      }
}
