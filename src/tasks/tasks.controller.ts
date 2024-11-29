import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Task } from './task.Entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }
  
  @Get()
  getAllTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.GetAllTasks(filterDto, user);
  }

  @Get("/:id")
  getTaskById(
    @Param("id") id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): Promise<string> {
    return this.tasksService.deleteTask(id); 
  }

  @Patch("/:id/status")
  updateTaskStatus(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }
}
