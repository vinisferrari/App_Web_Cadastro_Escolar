import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Aluno } from './alunos.model';
import { AlunosService } from './alunos.service';

@Controller('alunos')
export class AlunosController {
    constructor(private readonly alunoService: AlunosService){}

    @Get()
    readAllAlunos(): Promise<any>{
        return this.alunoService.readAlunos();
    }

    @Post()
    async createAluno(@Body() aluno: Aluno): Promise<any>{
        var response = await this.alunoService.createAluno(aluno);
        return {id: response}
    }

    @Get(':tia')
    getAluno(@Param('tia') tia: number){
        return this.alunoService.getAlunoByTia(tia);
    }

    @Delete(':tia')
    async deleteAluno(@Param('tia') tia: number){
        await this.alunoService.deleteAlunoByTia(tia);
        return null
    }

    @Patch()
    async updateAuno( @Body() aluno:Aluno): Promise<any>{
        return this.alunoService.updateAluno(aluno);
    }

}

