import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { ProfessorModule } from './professor/professor.module';


// mongodb+srv://vferrari:<password>@webmobilea7.qvemxzi.mongodb.net/?retryWrites=true&w=majority&appName=webmobileA7

@Module({
  imports: [AlunosModule,
    MongooseModule.forRoot('mongodb+srv://vferrari:000@webmobilea7.qvemxzi.mongodb.net/webmobile?retryWrites=true&w=majority&appName=webmobileA7'), 
    ProfessorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
