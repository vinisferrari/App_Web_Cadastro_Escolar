import { Injectable, NotFoundException } from '@nestjs/common';
import { Aluno } from './alunos.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AlunosService {
    constructor( @InjectModel('Aluno') private readonly alunoModel: Model<Aluno> ) {}
    
        //CRUD - CREAT, READ, UPDATE, DELETE
        //CREATE
        async createAluno(aluno: Aluno){
            const alunoModel = new this.alunoModel(
                {
                    nome: aluno.nome,
                    tia: aluno.tia,
                    curso: aluno.curso
                }
            );
            const result = await alunoModel.save();
            return result.id as string;
        }

        //READ
        async readAlunos(){
            const alunos = await this.alunoModel.find().exec();
            return alunos.map(alunos => ({
                id: alunos.id,
                nome: alunos.nome,
                tia: alunos.tia,
                curso: alunos.curso
            }));
        }

        //buscando Alunos pelo TIA
        async getAlunoByTia(tia: number): Promise<Aluno> {
            const aluno = await this.alunoModel.findOne({ tia: tia }).exec();
            if (!aluno) {
                throw new NotFoundException('Aluno não encontrado');
            }
            return {
                id: aluno.id,
                nome: aluno.nome,
                tia: aluno.tia,
                curso: aluno.curso
            } as Aluno;
        }

        //removendo Aluno pelo TIA
        async deleteAlunoByTia(tia: number){
            const result = await this.alunoModel.deleteOne({tia:tia}).exec();
            if (result.deletedCount === 0){
                throw new NotFoundException('could not delete the aluno')
            }
        }

        //ATUALIZANDO OS DADOS DE UMA ALUNO (UPDATE)
        async updateAluno(aluno:Aluno) {
            const updateAluno = await this.alunoModel.findOne({tia: aluno.tia});
            if (!updateAluno){
                throw new NotFoundException("Could not find aluno.")
            }
            if(aluno.nome){
                updateAluno.nome = aluno.nome
            }
            if (aluno.curso){
                updateAluno.curso = aluno.curso
            }
            updateAluno.save()
            return{
                id: updateAluno.id,
                nome: updateAluno.nome,
                tia: updateAluno.tia,
                curso: updateAluno.curso
            }
        }

    }
