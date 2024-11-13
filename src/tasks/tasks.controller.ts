import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task} from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }
  
  @Get()
  getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): string {
    this.tasksService.deleteTask(id);
    return `Deleted Task Successfully id: ${id}`;
  }

  @Patch("/:id/status")
  updateTaskStatus(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }
}
