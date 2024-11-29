import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./tasks-status.enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;

  @ManyToOne(type => User, user => user.task, { eager: false })
  user: User;
}