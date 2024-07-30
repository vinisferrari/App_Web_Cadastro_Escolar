import * as mongoose from "mongoose";

export const ProfessorSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    drt: {type: Number, required: true},
    area: {type: String, required: true},
    curso: {type: String, required: true}
})

export interface Professor extends mongoose.Document{
    id: string;
    nome: string;
    drt: number;
    area: string;
    curso: string;
}