import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Produto } from './produto.schema';

@Injectable()
export class ProdutosService {
    constructor(@InjectModel(Produto.name) private produtoModel: Model<Produto>) { }

    async adicionarProduto(dados: any): Promise<Produto> {
        return this.produtoModel.create(dados);
    }

    async listarProdutos(): Promise<Produto[]> {
        return this.produtoModel.find().exec();
    }

    async buscarProduto(nome: string): Promise<Produto> {
        return this.produtoModel.findOne({ nome }).exec();
    }

    async removerProduto(id: string): Promise<void> {
        await this.produtoModel.findByIdAndDelete(id).exec();
    }
}
