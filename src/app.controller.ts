import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  path: 'todos',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createTodo() {
    return this.appService.createTodo();
  }
}
