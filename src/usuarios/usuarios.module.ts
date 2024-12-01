import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario, UsuarioSchema } from './usuario.schema';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        CacheModule.register(),
        MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }])
    ],
    controllers: [UsuariosController],
    providers: [UsuariosService],
    exports: [UsuariosService],
})
export class UsuariosModule { }
