import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todos.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "todoDB",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Todo])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
