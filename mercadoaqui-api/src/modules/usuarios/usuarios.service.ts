import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async autenticar(email: string, senha: string) {
    const usuario = await this.usuariosRepo.findOne({ where: { email } });

    if (!usuario) throw new NotFoundException('Credenciais inválidas');

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) throw new NotFoundException('Credenciais inválidas');

    const payload = { sub: usuario.id, email: usuario.email };
    const token = this.jwtService.sign(payload);

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    };
  }

  async registrar(nome: string, email: string, senha: string) {
    const existe = await this.usuariosRepo.findOne({ where: { email } });
    if (existe) throw new Error('Email já cadastrado');

    const hash = await bcrypt.hash(senha, 10);
    const novo = this.usuariosRepo.create({ nome, email, senha: hash });
    const salvo = await this.usuariosRepo.save(novo);

    return {
      id: salvo.id,
      nome: salvo.nome,
      email: salvo.email,
    };
  }

  async atualizarPerfil(id: number, nome: string, email: string) {
    await this.usuariosRepo.update(id, { nome });
    return { message: 'Perfil atualizado' };
  }
  
  async deletarConta(id: number) {
    const resultado = await this.usuariosRepo.delete(id);
    if (resultado.affected === 0) throw new NotFoundException('Usuário não encontrado');
    return { message: 'Conta excluída com sucesso' };
  }
  
}