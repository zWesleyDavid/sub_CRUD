import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/login.dto';

@ApiTags('Autenticação')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: { email: string; senha: string }) {
        return this.authService.validarUsuario(body.email, body.senha)
            .then(usuario => this.authService.login(usuario))
            .catch(err => ({ mensagem: 'Falha no login: ' + err.message }));
    }
}
