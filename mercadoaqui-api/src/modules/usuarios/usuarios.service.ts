
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async autenticar(email: string, senha: string) {
    const usuario = await this.usuariosRepo.findOne({ where: { email } });

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

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

    if (existe) {
      throw new Error('Email já cadastrado');
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novo = this.usuariosRepo.create({
      nome,
      email,
      senha: senhaCriptografada,
    });

    const salvo = await this.usuariosRepo.save(novo);

    return {
      id: salvo.id,
      nome: salvo.nome,
      email: salvo.email,
    };
  }
}
