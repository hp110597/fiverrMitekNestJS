import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NguoidungService {
  constructor(private jwt: JwtService) {}
  private prisma: PrismaClient = new PrismaClient();

  //get nguoi-dung
  async getNguoiDung(): Promise<any> {
    let dataNguoiDung = await this.prisma.nguoiDung.findMany({});
    return {
      data: { content: 'Lấy bình luận thành công', dataNguoiDung },
    };
  }

  //post nguoi-dung
  async postNguoiDung(
    name: string,
    email: string,
    pass_word: string,
    phone: string,
    birth_day: string,
    gender: string,
    role: string,
    skill: string,
    certification: string,
  ): Promise<any> {
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) {
      return {
        check: false,
        data: 'Email đã tồn tại',
      };
    } else {
      let dataSignup = await this.prisma.nguoiDung.create({
        data: {
          name,
          email,
          pass_word,
          phone,
          birth_day,
          gender,
          role,
          skill,
          certification,
        },
      });
      return {
        check: true,
        data: dataSignup,
        message: 'Post người dùng thành công',
      };
    }
  }

  //get nguoi-dung theo id
  async getNguoiDungID(id: string): Promise<any> {
    let dataNguoiDung = await this.prisma.nguoiDung.findFirst({
      where: {
        nguoidung_id: +id,
      },
    });
    if (dataNguoiDung) {
      return {
        check: true,
        data: {
          content: 'Lấy danh sách người dùng theo id thành công',
          dataNguoiDung,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Lấy danh sách người dùng theo id thất bại' },
      };
    }
  }

  //delete nguoi-dung theo id
  async deleteNguoiDung(id: string): Promise<any> {
    let checkNguoiDung = await this.prisma.nguoiDung.findFirst({
      where: {
        nguoidung_id: +id,
      },
    });
    if (checkNguoiDung) {
      let dataNguoiDung = await this.prisma.nguoiDung.delete({
        where: {
          nguoidung_id: +id,
        },
      });
      return {
        check: true,
        data: {
          content: 'Xóa người dùng thành công',
          data: dataNguoiDung,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Xóa người dùng thất bại ' },
      };
    }
  }

  //put nguoi-dung theo id
  async putNguoiDung(
    id: string,
    name: string,
    email: string,
    pass_word: string,
    phone: string,
    birth_day: string,
    gender: string,
    role: string,
    skill: string,
    certification: string,
  ): Promise<any> {
    let checkNguoiDung = await this.prisma.nguoiDung.findFirst({
      where: {
        nguoidung_id: +id,
      },
    });
    if (checkNguoiDung) {
      let dataNguoiDung = await this.prisma.nguoiDung.update({
        data: {
          name,
          email,
          pass_word,
          phone,
          birth_day,
          gender,
          role,
          skill,
          certification,
        },
        where: {
          nguoidung_id: +id,
        },
      });
      return {
        check: true,
        data: {
          content: 'Chỉnh sửa người dùng theo id thành công',
          data: dataNguoiDung,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Chỉnh sửa người dùng thất bại' },
      };
    }
  }
}
