import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('auth')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('register')
  register(@Body() body: { nome: string; email: string; senha: string }) {
    return this.usuariosService.registrar(body.nome, body.email, body.senha);
  }

  @Post('login')
  login(@Body() body: { email: string; senha: string }) {
    return this.usuariosService.autenticar(body.email, body.senha);
  }

  @Patch('atualizar')
  atualizar(@Body() body: { id: number; nome: string; email: string }) {
    return this.usuariosService.atualizarPerfil(body.id, body.nome, body.email);
  }

  @Delete('excluir/:id')
  excluir(@Param('id') id: string) {
    return this.usuariosService.deletarConta(Number(id));
  }
}