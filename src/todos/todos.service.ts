import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todosRepository: Repository<Todo>,
  ) {}

  async findAllTodos(): Promise<Todo[]> {
    return await this.todosRepository.find();
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todosRepository.save({
      ...createTodoDto,
      details: '',
      important: false,
      completed: false,
    });
  }

  async findTodoById(id: string): Promise<Todo> {
    const todo = await this.todosRepository.findOne({ id });
    if (!todo) {
      throw new NotFoundException("todo doesn't exist");
    }

    return await this.todosRepository.findOne({ id });
  }

  async updateTodoById(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const task = await this.findTodoById(id);

    return await this.todosRepository.save({ ...task, ...updateTodoDto });
  }

  async toggleTodoImportanceById(id: string): Promise<Todo> {
    const task = await this.findTodoById(id);
    task.important = !task.important;

    return await this.todosRepository.save(task);
  }

  async toggleTodoCompletedById(id: string) {
    const task = await this.findTodoById(id);
    task.completed = !task.completed;

    return await this.todosRepository.save(task);
  }

  async deleteTodoById(id: string) {
    await this.findTodoById(id);

    await this.todosRepository.delete({ id });
  }
}
