import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.Entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }
  
  async GetAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  // getTaskWithFilters(filterDto: GetTaskFilterDto): Array<Task>{
  //   const { status, search } = filterDto;

  //   let tasks = this.tasks;

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }

  //       return false;
  //     })
  //   }

  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({
        where: { id },
      });
    
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({ title, description, status: TaskStatus.OPEN });
    
    await this.tasksRepository.save(task);
    
    return task;
  }

  async deleteTask(id: string): Promise<string> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return `Delete Task id ${id} successfull`;
  }

  async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = updateTaskStatusDto.status;
    await this.tasksRepository.save(task);
    return task;
  }
}
