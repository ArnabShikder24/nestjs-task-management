import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  // getAllTasks(): Array<Task> {
  //   return this.tasks;
  // }

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

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const newTask: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   };

  //   this.tasks.push(newTask);
  //   return newTask;
  // }

  // deleteTask(id: string): void {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  // updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
  //   const task = this.getTaskById(id);
  //   task.status = updateTaskStatusDto.status;
  //   return task;
  // }
}
