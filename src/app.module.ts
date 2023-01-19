import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { LoaicongviecModule } from './loaicongviec/loaicongviec.module';
import { NguoidungModule } from './nguoidung/nguoidung.module';
import { ThuecongviecModule } from './thuecongviec/thuecongviec.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    TaskModule,
    LoaicongviecModule,
    NguoidungModule,
    ThuecongviecModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
