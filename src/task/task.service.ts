import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TaskService {

    constructor(
        private config: ConfigService
    ) {
    }

    private prisma: PrismaClient = new PrismaClient();

    // async getTask(): Promise<cong_viec[]> {
    //     return await this.prisma.cong_viec.findMany();
    // }
    
}
