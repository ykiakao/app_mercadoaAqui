import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { Preco } from '../admin/preco.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(
    @InjectRepository(Produto)
    private produtoRepo: Repository<Produto>,
    @InjectRepository(Preco)
    private precoRepo: Repository<Preco>,
  ) {}

  @Get()
  async listarTodos() {
    return this.produtoRepo.find();
  }

  @Get('com-precos')
  async listarComPrecos() {
    const produtos = await this.produtoRepo.find();
    const precos = await this.precoRepo.find({ relations: ['produto', 'mercado'] });

    return produtos.map(prod => {
      const relacionados = precos.filter(p => p.produto.id === prod.id);
      const menorPreco = relacionados.sort((a, b) => a.preco - b.preco)[0];
      return {
        id: prod.id,
        nome: prod.nome,
        categoria: prod.categoria,
        tipo: prod.tipo,
        preco: menorPreco?.preco ?? null,
        mercado: menorPreco?.mercado?.nome ?? null
      };
    });
  }
}