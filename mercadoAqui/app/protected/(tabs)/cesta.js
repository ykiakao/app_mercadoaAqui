import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function Cesta() {
  const cestas = [
    {
      id: '1',
      mercado: 'Atacadão Central',
      data: '12/05/2025 às 11:00',
      produtos: [
        { nome: 'Arroz Tio Urbano 5kg', preco: 31.49 },
        { nome: 'Feijão Carioca Namorado 1kg', preco: 6.89 },
        { nome: 'Óleo de Soja Liza 900ml', preco: 5.99 }
      ]
    },
    {
      id: '2',
      mercado: 'Supermercado Bom Preço',
      data: '12/05/2025 às 10:45',
      produtos: [
        { nome: 'Arroz Tio Urbano 5kg', preco: 32.90 },
        { nome: 'Feijão Carioca Namorado 1kg', preco: 7.49 },
        { nome: 'Óleo de Soja Liza 900ml', preco: 6.10 }
      ]
    },
    {
      id: '3',
      mercado: 'Mercado Econômico',
      data: '12/05/2025 às 10:30',
      produtos: [
        { nome: 'Arroz Tio Urbano 5kg', preco: 30.99 },
        { nome: 'Feijão Carioca Namorado 1kg', preco: 6.79 },
        { nome: 'Óleo de Soja Liza 900ml', preco: 6.20 }
      ]
    }
  ];

  const calcularTotal = (produtos) =>
    produtos.reduce((soma, item) => soma + item.preco, 0);

  const menorTotal = Math.min(...cestas.map(c => calcularTotal(c.produtos)));

  const renderCesta = ({ item }) => {
    const total = calcularTotal(item.produtos);
    const isMaisBarata = total === menorTotal;

    return (
      <View style={[styles.card, isMaisBarata && styles.cardDestaque]}>
        <View style={styles.headerRow}>
          <Text style={styles.mercado}>{item.mercado}</Text>
          {isMaisBarata && <Text style={styles.selo}>Mais Barata</Text>}
        </View>

        <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

        <View style={styles.produtosBox}>
          {item.produtos.map((produto, index) => (
            <View key={index} style={styles.produtoRow}>
              <Text style={styles.produtoNome}>{produto.nome}</Text>
              <Text style={styles.produtoPreco}>R$ {produto.preco.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.data}>Atualizado em: {item.data}</Text>

        <View style={styles.botoesBox}>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoTexto}>Ver rota</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Comparativo de Cestas Básicas</Text>
      <FlatList
        data={[...cestas].sort((a, b) => calcularTotal(a.produtos) - calcularTotal(b.produtos))}
        keyExtractor={(item) => item.id}
        renderItem={renderCesta}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#007BFF', marginBottom: 20, textAlign: 'center' },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9'
  },
  cardDestaque: {
    borderColor: '#28a745',
    backgroundColor: '#eafff1'
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  selo: {
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  mercado: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  total: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#007BFF' },
  produtosBox: { marginBottom: 8 },
  produtoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  produtoNome: { fontSize: 14 },
  produtoPreco: { fontSize: 14, fontWeight: '600' },
  data: { fontSize: 12, color: '#666', textAlign: 'right', marginTop: 8 },
  botoesBox: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  botao: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  botaoSec: {
    backgroundColor: '#444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  botaoTexto: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold'
  }
});
