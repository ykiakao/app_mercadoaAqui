import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mercado } from './mercado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mercado])],
  exports: [TypeOrmModule],
})
export class MercadoModule {}