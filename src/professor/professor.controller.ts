import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Professor } from './professores.model';
import { ProfessorService } from './professor.service';

@Controller('professor')
export class ProfessorController {
    constructor(private readonly professorService: ProfessorService){}

        //Lendo todos os professores do banco de dados
        @Get()
        readAllProfessores(): Promise<any>{
            return this.professorService.readProfessores();
        }

        @Get(':drt')
        getProfessor(@Param('drt') drt: number): Promise<any>{
            return this.professorService.getProfessorByDRT(drt);
        }
        
        @Post()
        async createAluno(@Body() professor: Professor): Promise<any>{
            var response = await this.professorService.createProfessor(professor);
            return {id: response}
        }

        @Delete(':drt')
        async deleteProfessor(@Param('drt') drt: number){
            await this.professorService.deleteProfessorByDrt(drt);
            return null
        }

        @Patch()
        async updateProfessor( @Body() professor:Professor): Promise<any>{
            return this.professorService.updateProfessor(professor);
        }


}

