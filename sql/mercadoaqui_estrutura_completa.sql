
CREATE DATABASE IF NOT EXISTS mercadoaqui;
USE mercadoaqui;

-- Usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('cliente', 'funcionario') DEFAULT 'cliente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  categoria VARCHAR(50),
  tipo VARCHAR(50)
);

-- Mercados
CREATE TABLE IF NOT EXISTS mercados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  endereco TEXT
);

-- Preços de produtos por mercado
CREATE TABLE IF NOT EXISTS precos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT,
  mercado_id INT,
  preco DECIMAL(10,2) NOT NULL,
  atualizado_em DATETIME,
  FOREIGN KEY (produto_id) REFERENCES produtos(id),
  FOREIGN KEY (mercado_id) REFERENCES mercados(id)
);

-- Listas de compras criadas por usuários
CREATE TABLE IF NOT EXISTS listas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  nome VARCHAR(100),
  criada_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Itens de cada lista
CREATE TABLE IF NOT EXISTS itens_lista (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lista_id INT,
  produto_id INT,
  quantidade INT DEFAULT 1,
  FOREIGN KEY (lista_id) REFERENCES listas(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Cestas básicas por mercado
CREATE TABLE IF NOT EXISTS cestas_basicas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mercado_id INT,
  data_atualizacao DATETIME,
  preco_total DECIMAL(10,2),
  FOREIGN KEY (mercado_id) REFERENCES mercados(id)
);

-- Avaliações de mercados
CREATE TABLE IF NOT EXISTS avaliacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  mercado_id INT,
  atendimento TINYINT,
  preco TINYINT,
  confiabilidade TINYINT,
  comentario TEXT,
  data DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (mercado_id) REFERENCES mercados(id)
);
