import * as mongoose from "mongoose";

export const AlunoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    tia: {type: String, required: true},
    curso: {type: String, required: true}
})

export interface Aluno extends mongoose.Document{
    id: string;
    nome: string;
    tia: string;
    curso: string;
}