import { Controller, Get, Param } from '@nestjs/common';
import { Task } from './task.Entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }
  
  // @Get()
  // getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskWithFilters(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete("/:id")
  // deleteTask(@Param("id") id: string): string {
  //   this.tasksService.deleteTask(id);
  //   return `Deleted Task Successfully id: ${id}`;
  // }

  // @Patch("/:id/status")
  // updateTaskStatus(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
  //   return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  // }
}
