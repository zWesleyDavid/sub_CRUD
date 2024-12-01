import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { Produto, ProdutoSchema } from './produto.schema';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        CacheModule.register(),
        MongooseModule.forFeature([{ name: Produto.name, schema: ProdutoSchema }])
    ],
    controllers: [ProdutosController],
    providers: [ProdutosService],
})
export class ProdutosModule { }
