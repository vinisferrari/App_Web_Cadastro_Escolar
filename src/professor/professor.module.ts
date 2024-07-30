import { Module } from '@nestjs/common';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessorSchema } from './professores.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Professor', schema: ProfessorSchema}])
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService]
})
export class ProfessorModule {}
