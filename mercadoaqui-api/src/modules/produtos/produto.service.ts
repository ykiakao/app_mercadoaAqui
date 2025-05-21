// produtosservice.ts
import { Injectable } from '@nestjs/common';    
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { Preco } from '../admin/preco.entity';
import { Mercado } from '../admin/mercado.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepo: Repository<Produto>,
    @InjectRepository(Preco)
    private readonly precoRepo: Repository<Preco>,
    @InjectRepository(Mercado)
    private readonly mercadoRepo: Repository<Mercado>,
  ) {}

  async listarTodos(): Promise<Produto[]> {
    return this.produtoRepo.find();
  }

  async listarComPrecos(): Promise<any[]> {
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