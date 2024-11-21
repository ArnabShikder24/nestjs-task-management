import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.Entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';

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

  async deleteTask(id: string): Promise<void> {
    // const remove = await this.getTaskById(id); // for using remove
    await this.tasksRepository.delete(id);
  }

  // updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
  //   const task = this.getTaskById(id);
  //   task.status = updateTaskStatusDto.status;
  //   return task;
  // }
}
