import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todos.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
  async createTodo(title: string) {
    const todo = this.todoRepository.create({ title });
    await this.todoRepository.save(todo);
    return { success: true };
  }

  async getTodos() {
    const todos = await this.todoRepository.find();
    return todos;
  }
}

