import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  createTodo() {
    return { success: true };
  }
}
