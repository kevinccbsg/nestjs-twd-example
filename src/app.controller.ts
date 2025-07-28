import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  path: 'todos',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createTodo(@Body() body: { title: string }) {
    return this.appService.createTodo(body.title);
  }
}
