import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários')
@ApiBearerAuth()
@UseInterceptors(CacheInterceptor)
@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    criar(@Body() dados: any) {
        return this.usuariosService.criar(dados);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista obtida com sucesso' })
    listarTodos() {
        return this.usuariosService.listarTodos();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtém um usuário pelo ID' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    buscarPorId(@Param('id') id: string) {
        return this.usuariosService.buscarPorId(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualiza os dados de um usuário' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
    atualizar(@Param('id') id: string, @Body() dados: any) {
        return this.usuariosService.atualizar(id, dados);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove um usuário' })
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
    remover(@Param('id') id: string) {
        return this.usuariosService.remover(id);
    }
}
