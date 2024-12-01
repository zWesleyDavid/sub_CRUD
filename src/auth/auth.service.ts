import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) { }

    async validarUsuario(email: string, senha: string): Promise<any> {
        const usuario = await this.usuariosService.buscarPorEmail(email);
        if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
            const { senha, ...resultado } = usuario.toObject();
            return resultado;
        }
        throw new UnauthorizedException('Credenciais inválidas');
    }

    async login(usuario: any) {
        const payload = { 
            username: usuario.email,
            sub: usuario._id,
            role: usuario.papel 
        };
        return {
            access_token: this.jwtService.sign(payload),
            mensagem: `Bem-vindo(a), ${usuario.nome}!`,
        };
    }
}
