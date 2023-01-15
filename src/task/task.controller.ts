import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';

@ApiTags("Task")
@Controller('task')
export class TaskController {

    constructor(
        private taskSerivice: TaskService,

    ) { }

    // @Get()
    // getTask(): Promise<cong_viec[]> {
    //     return this.taskSerivice.getTask();
    // }
}
