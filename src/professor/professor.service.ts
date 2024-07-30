import { Injectable, NotFoundException } from '@nestjs/common';
import { Professor } from './professores.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfessorService {
    constructor( @InjectModel('Professor') private readonly professorModel: Model<Professor> ) {}

    //Criando todos os métodos CRUD

    //adicionando um novo professor no banco de dados
    async createProfessor(professor: Professor){
        const professorModel = new this.professorModel(
            {
                nome: professor.nome,
                drt: professor.drt,
                area: professor.area,
                curso: professor.curso
            }
        );
        const result = await professorModel.save();
        return result.id as string;
    }

    //Lendo todos os professores cadastrados no banco de dados
    async readProfessores(){
        const professores = await this.professorModel.find().exec();
        return professores.map(professores => ({
            id: professores.id,
            nome: professores.nome,
            drt: professores.drt,
            area: professores.area,
            curso: professores.curso
        }));
    }

    //buscando Professor pelo DRT
    async getProfessorByDRT(drt: number): Promise<Professor> {
        const professor = await this.professorModel.findOne({ drt: drt }).exec();
        if (!professor) {
            throw new NotFoundException('professor não encontrado');
        }
        return {
            id: professor.id,
            nome: professor.nome,
            drt: professor.drt,
            area: professor.area,
            curso: professor.curso
        } as Professor;
    }   

    //Atualizar cadastro de um professor no banco de dados
    async updateProfessor(professor:Professor) {
        const updateProfessor = await this.professorModel.findOne({drt: professor.drt});
        if (!updateProfessor){
            throw new NotFoundException("Could not find professor.")
        }
        if(professor.nome){
            updateProfessor.nome = professor.nome
        }
        if(professor.area){
            updateProfessor.area = professor.area
        }
        if (professor.curso){
            updateProfessor.curso = professor.curso
        }
        updateProfessor.save()
        return{
            id: updateProfessor.id,
            nome: updateProfessor.nome,
            drt: updateProfessor.drt,
            area: updateProfessor.area,
            curso: updateProfessor.curso
        }
    }

    //removendo professor pelo DRT
    async deleteProfessorByDrt(drt: number){
        const result = await this.professorModel.deleteOne({drt:drt}).exec();
        if (result.deletedCount === 0){
            throw new NotFoundException('could not delete the professor')
        }
    }

}
