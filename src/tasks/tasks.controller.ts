import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }
  
  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks()
  }

  @Post()
  createTask(@Body() {title, description}): Task {
    return this.tasksService.createTask(title, description);
  }
}
