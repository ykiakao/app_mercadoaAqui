import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useState } from 'react';

export default function Lista() {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [itens, setItens] = useState([]);

  const adicionarItem = () => {
    if (!produto.trim() || !quantidade.trim()) {
      Alert.alert("Erro", "Preencha o nome do produto e a quantidade.");
      return;
    }

    setItens([...itens, { id: Date.now().toString(), nome: produto, qtd: quantidade }]);
    setProduto('');
    setQuantidade('');
  };

  const removerItem = (id) => {
    setItens(itens.filter(item => item.id !== id));
  };

  const compararPrecos = () => {
    if (itens.length === 0) {
      Alert.alert("Lista vazia", "Adicione ao menos um item antes de comparar.");
      return;
    }

    Alert.alert("Comparando...", "Simulação de comparação de preços.");
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTexto}>{item.qtd}x {item.nome}</Text>
      <TouchableOpacity onPress={() => removerItem(item.id)}>
        <Text style={styles.remover}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Lista de Compras</Text>

      <TextInput
        placeholder="Nome do produto"
        value={produto}
        onChangeText={setProduto}
        style={styles.input}
      />

      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={{ marginBottom: 20 }}>
        <Button title="Adicionar à Lista" color="#007BFF" onPress={adicionarItem} />
      </View>

      <Text style={styles.sugestaoTitulo}>Sugestões de Produtos</Text>
      <View style={styles.sugestoesContainer}>
        {[
          {
            nome: 'Arroz Tio Urbano 5kg',
            categoria: 'Mercearia',
            tipo: 'Grão',
            imagem: 'https://static.paodeacucar.com/img/uploads/1/51/659051.jpg'
          },
          {
            nome: 'Leite Integral 1L',
            categoria: 'Bebidas',
            tipo: 'Líquido',
            imagem: 'https://static.paodeacucar.com/img/uploads/1/986/32854986.png'
          },
          {
            nome: 'Sabão em Pó Omo 1kg',
            categoria: 'Limpeza',
            tipo: 'Pó',
            imagem: 'https://static.paodeacucar.com/img/uploads/1/890/32852890.png'
          },
          {
            nome: 'Macarrão Espaguete 500g',
            categoria: 'Mercearia',
            tipo: 'Massa',
            imagem: 'https://static.paodeacucar.com/img/uploads/1/522/32848522.png'
          },
          {
            nome: 'Refrigerante Coca-Cola 2L',
            categoria: 'Bebidas',
            tipo: 'Líquido',
            imagem: 'https://static.paodeacucar.com/img/uploads/1/672/32848672.png'
          }
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.sugestaoCard}
            onPress={() => {
              setProduto(item.nome);
              setQuantidade('1');
            }}
          >
            <View style={styles.sugestaoTextoBox}>
              <Text style={styles.sugestaoNome}>{item.nome}</Text>
              <Text style={styles.sugestaoTag}>Categoria: {item.categoria}</Text>
              <Text style={styles.sugestaoTag}>Tipo: {item.tipo}</Text>
            </View>
            <Image source={{ uri: item.imagem }} style={styles.sugestaoImagem} />
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center' }}>Nenhum item adicionado.</Text>}
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      <Button title="Comparar Preços" color="#28a745" onPress={compararPrecos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#007BFF', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  itemTexto: { fontSize: 16 },
  remover: { color: '#d32f2f', fontSize: 14 },

  sugestaoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12
  },
  sugestoesContainer: {
    marginBottom: 16
  },
  sugestaoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5'
  },
  sugestaoTextoBox: {
    flex: 1,
    paddingRight: 10
  },
  sugestaoImagem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'contain'
  },
  sugestaoNome: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4
  },
  sugestaoTag: {
    fontSize: 12,
    color: '#555'
  }
});
