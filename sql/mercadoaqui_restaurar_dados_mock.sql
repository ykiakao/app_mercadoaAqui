
USE mercadoaqui;

-- Inserir usuários
INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('João Silva', 'joao@email.com', '$2b$10$1nGch8eN8lY9jA7WrsUO9eNHTUoTbcHGdyY6Xr3PaJ4Ov96aM1zxu', 'cliente'), -- senha123
('Maria Souza', 'maria@email.com', '$2b$10$1nGch8eN8lY9jA7WrsUO9eNHTUoTbcHGdyY6Xr3PaJ4Ov96aM1zxu', 'cliente');

-- Inserir produtos
INSERT INTO produtos (nome, categoria, tipo) VALUES
('Arroz 5kg', 'Alimentos', 'Grãos'),
('Feijão 1kg', 'Alimentos', 'Grãos'),
('Óleo de Soja 900ml', 'Alimentos', 'Óleos'),
('Sabonete', 'Higiene', 'Pessoal');

-- Inserir mercados
INSERT INTO mercados (nome, endereco) VALUES
('Supermercado A', 'Rua das Flores, 123'),
('Supermercado B', 'Avenida Central, 456');

-- Inserir preços
INSERT INTO precos (produto_id, mercado_id, preco, atualizado_em) VALUES
(1, 1, 22.90, NOW()),
(2, 1, 7.99, NOW()),
(3, 1, 6.50, NOW()),
(4, 1, 1.99, NOW()),
(1, 2, 23.50, NOW()),
(2, 2, 8.20, NOW()),
(3, 2, 6.30, NOW()),
(4, 2, 2.10, NOW());

-- Inserir uma lista de compras
INSERT INTO listas (usuario_id, nome) VALUES
(1, 'Compra da semana');

-- Inserir itens na lista
INSERT INTO itens_lista (lista_id, produto_id, quantidade) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 1);

-- Inserir uma cesta básica
INSERT INTO cestas_basicas (mercado_id, data_atualizacao, preco_total) VALUES
(1, NOW(), 38.39),
(2, NOW(), 40.10);

-- Inserir avaliações
INSERT INTO avaliacoes (usuario_id, mercado_id, atendimento, preco, confiabilidade, comentario) VALUES
(1, 1, 5, 4, 5, 'Bom atendimento e produtos frescos.'),
(2, 2, 4, 3, 4, 'Preços um pouco altos, mas confiável.');
