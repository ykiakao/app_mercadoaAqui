import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AdminModule } from './modules/admin/admin.module';

import { Usuario } from './modules/usuarios/usuario.entity';

@Module({
  imports: [
    // Carrega variáveis do .env
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexão com o banco de dados MySQL via TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Usuario],
      synchronize: false, // true só em desenvolvimento
    }),

    // Módulo JWT global
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),

    // Módulos da aplicação
    UsuariosModule,
    AdminModule,
  ],
})
export class AppModule {}
