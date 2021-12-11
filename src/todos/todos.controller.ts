import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAllTodos(): Promise<Todo[]> {
    return await this.todosService.findAllTodos();
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todosService.createTodo(createTodoDto);
  }

  @Get(':id')
  async findTodoById(@Param('id') id: string): Promise<Todo> {
    return await this.todosService.findTodoById(id);
  }

  @Patch(':id')
  async updateTodoById(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todosService.updateTodoById(id, updateTodoDto);
  }

  @Post(':id/important')
  @HttpCode(200)
  async toggleTodoImportanceById(@Param('id') id: string): Promise<Todo> {
    return await this.todosService.toggleTodoImportanceById(id);
  }

  @Post(':id/completed')
  @HttpCode(200)
  async toggleTodoCompletedById(@Param('id') id: string): Promise<Todo> {
    return await this.todosService.toggleTodoCompletedById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTodoById(@Param('id') id: string) {
    await this.todosService.deleteTodoById(id);
  }
}
