import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './usuario.schema';

@Injectable()
export class UsuariosService {
    constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) { }

    async criar(dados: any): Promise<Usuario> {
        const emailExiste = await this.usuarioModel.findOne({ email: dados.email}).exec();
        if (emailExiste){
            throw new Error('O e-mail já está em uso!');
        }

        const senhaHash = await bcrypt.hash(dados.senha, 10);
        return this.usuarioModel.create({ ...dados, senha: senhaHash });
    }

    async listarTodos(): Promise<Usuario[]> {
        return this.usuarioModel.find().exec();
    }

    async buscarPorId(id: string): Promise<Usuario> {
        return this.usuarioModel.findById(id).exec();
    }

    async buscarPorEmail(email: string): Promise<Usuario> {
        const usuario = await this.usuarioModel.findOne({ email }).exec();
        if (!usuario) {
            throw new NotFoundException(`Usuário com o email ${email} não encontrado`);
        }
        return usuario;
    }

    async atualizar(id: string, dados: any): Promise<Usuario> {
        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 10);
        }
        return this.usuarioModel.findByIdAndUpdate(id, dados, { new: true }).exec();
    }

    async remover(id: string): Promise<Usuario> {
        return this.usuarioModel.findByIdAndDelete(id).exec();
    }
}
