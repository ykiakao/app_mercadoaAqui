import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function Historico() {
  const dadosHistorico = [
    {
      id: '1',
      mercado: 'Supermercado Bom Preço',
      valor: '89,90',
      data: '08/05/2025'
    },
    {
      id: '2',
      mercado: 'Mercado Econômico',
      valor: '92,70',
      data: '06/05/2025'
    },
    {
      id: '3',
      mercado: 'Atacadão Central',
      valor: '88,50',
      data: '04/05/2025'
    }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.mercado}>{item.mercado}</Text>
        <Text style={styles.valor}>Total: R$ {item.valor}</Text>
        <Text style={styles.data}>{item.data}</Text>
      </View>
      <TouchableOpacity style={styles.botaoDetalhes} onPress={() => alert('Ver detalhes ainda não implementado')}>
        <Text style={styles.textoBotao}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Comparações</Text>
      <FlatList
        data={dadosHistorico}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
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
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mercado: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  valor: { fontSize: 14 },
  data: { fontSize: 12, color: '#666' },
  botaoDetalhes: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  textoBotao: { color: 'white', fontSize: 12, fontWeight: 'bold' }
});
