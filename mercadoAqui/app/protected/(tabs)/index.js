import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Animated, findNodeHandle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const scrollViewRef = useRef(null);

  const [produtos, setProdutos] = useState([]);

  const refs = {
    Mercearia: useRef(null),
    Laticínios: useRef(null),
    Bebidas: useRef(null),
    Higiene: useRef(null),
    Limpeza: useRef(null),
  };

  useEffect(() => {
    fetch('http://localhost:3000/produtos/com-precos')
      .then(res => res.json())
      .then(data => {
        console.log('📦 Produtos recebidos:', data);
        setProdutos(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Erro ao buscar produtos:', err));
  }, []);

  const handleCategoriaClick = (categoria) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.3, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();

    const node = findNodeHandle(refs[categoria]?.current);
    if (node && scrollViewRef.current) {
      refs[categoria].current.measureLayout(scrollViewRef.current, (_x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      });
    }
  };

  const produtosPorCategoria = (cat) => produtos.filter(p => p.categoria === cat);
  const ofertas = produtos.slice(0, 8).map(p => ({ ...p, desconto: 10 + Math.floor(Math.random() * 6) }));

const renderProdutos = (lista) => lista.map((item, index) => (
  <View key={index} style={styles.productCard}>
    <Text style={styles.productName}>{item.nome}</Text>
    <Text style={styles.price}>R$ {item.preco?.toFixed(2) ?? '--'}</Text>
    <Text style={{ fontSize: 12, color: '#444' }}>Tipo: {item.tipo || '-'}</Text>
    <Text style={{ fontSize: 12, color: '#444' }}>Categoria: {item.categoria || '-'}</Text>
    <Text style={{ fontSize: 12, color: '#888' }}>Mercado: {item.mercado || '-'}</Text>
    {item.desconto && (
      <Text style={styles.discount}>-{item.desconto}% OFF</Text>
    )}
  </View>
));


  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} ref={scrollViewRef}>
        <View style={styles.header}>
          <Text style={styles.logo}>
            <Text style={{ color: '#007BFF', fontWeight: '900' }}>Mercado</Text><Text style={{ fontWeight: '900' }}>Aqui</Text>
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput placeholder="Pesquisar" style={styles.searchInput} />
        </View>

        <View style={{ marginTop: 12 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <Text style={styles.sectionLink}>Ver mais</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {Object.keys(refs).map((cat, index) => (
              <TouchableOpacity key={index} onPress={() => handleCategoriaClick(cat)}>
                <Animated.View style={[styles.categoryItem, { opacity: fadeAnim }]}>
                  <Ionicons name="leaf-outline" size={24} color="white" />
                  <Text style={styles.categoryText}>{cat}</Text>
                </Animated.View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>Ofertas</Text>
        <View style={styles.offerGrid}>{renderProdutos(ofertas)}</View>

        {Object.keys(refs).map((cat, idx) => (
          <View key={idx} ref={refs[cat]}>
            <Text style={styles.sectionTitle}>{cat}</Text>
            <View style={styles.offerGrid}>{renderProdutos(produtosPorCategoria(cat))}</View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/protected/(tabs)/lista')}>
        <Ionicons name="add-circle" size={56} color="#007BFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  logo: { fontSize: 24, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f0f0f0', borderRadius: 10,
    paddingHorizontal: 10, marginBottom: 20
  },
  searchInput: { marginLeft: 8, flex: 1, height: 40 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  sectionLink: { fontSize: 14, color: '#007BFF' },
  categoryScroll: { marginBottom: 24 },
  categoryItem: {
    width: 100, height: 80, backgroundColor: '#007BFF',
    borderRadius: 10, padding: 10,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12
  },
  categoryText: { color: 'white', fontSize: 12, marginTop: 4 },
  offerGrid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 },
  productCard: {
    width: '48%', borderWidth: 1, borderColor: '#ccc',
    borderRadius: 10, padding: 8, marginBottom: 12
  },
  productImage: { width: '100%', height: 100, resizeMode: 'contain', marginBottom: 8 },
  price: { fontWeight: 'bold', fontSize: 16 },
  discount: { color: 'green', fontWeight: 'bold', marginBottom: 4 },
  productName: { fontSize: 12, color: '#333' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'white',
    borderRadius: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  }
});