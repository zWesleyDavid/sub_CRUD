import { Controller, Get, Post, Delete, Body, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Produtos')
@ApiBearerAuth()
@Controller('produtos')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(CacheInterceptor)
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um novo produto (somente Admin)' })
    @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
    @Roles('admin')
    async adicionarProduto(@Body() produto: any) {
        try {
            const novoProduto = await this.produtosService.adicionarProduto(produto);
            return { mensagem: `Produto ${novoProduto.nome} adicionado com sucesso!`, produto: novoProduto };
        } catch (error) {
            return { mensagem: 'Erro ao adicionar produto', erro: error.message };
        }
    }

    @Get()
    @ApiOperation({ summary: 'Lista todos os produtos' })
    @ApiResponse({ status: 200, description: 'Lista obtida com sucesso' })
    async listarProdutos() {
        return this.produtosService.listarProdutos();
    }

    @Get(':nome')
    @ApiOperation({ summary: 'Busca um produto pelo nome' })
    @ApiResponse({ status: 200, description: 'Produto encontrado' })
    async buscarProduto(@Param('nome') nome: string) {
        return this.produtosService.buscarProduto(nome);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove um produto (somente Admin)' })
    @ApiResponse({ status: 200, description: 'Produto removido com sucesso' })
    @Roles('admin')
    async removerProduto(@Param('id') id: string) {
        try {
            await this.produtosService.removerProduto(id);
            return { mensagem: 'Produto removido com sucesso!' };
        } catch (error) {
            return { mensagem: 'Erro ao remover produto', erro: error.message };
        }
    }
}
