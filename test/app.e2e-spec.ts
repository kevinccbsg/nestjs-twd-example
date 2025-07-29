import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { Repository } from 'typeorm';
import { Todo } from './../src/entities/todos.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TODO API (e2e)', () => {
  let app: INestApplication<App>;
  let todoRepository: Repository<Todo>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    todoRepository = moduleFixture.get<Repository<Todo>>(getRepositoryToken(Todo));
    await app.init();
  });

  afterEach(async () => {
    await todoRepository.clear();
  });

  it('/todos (POST)', async () => {
    const title = 'test';
    await request(app.getHttpServer())
      .post('/todos')
      .send({ title })
      .expect(201)
      .expect({ success: true });

    const todos = await todoRepository.find();
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe(title);
  });

  it('/todos (GET)', async () => {
    const title = 'test';
    await request(app.getHttpServer())
      .post('/todos')
      .send({ title })
      .expect(201)
      .expect({ success: true });

    const response = await request(app.getHttpServer())
      .get('/todos')
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe(title);
  });

  it('/todos (GET) - with data', async () => {
    const title = 'test';
    await todoRepository.save({ title });

    const response = await request(app.getHttpServer())
      .get('/todos')
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe(title);
  });
});
