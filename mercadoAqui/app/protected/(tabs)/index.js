import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { useRouter } from 'expo-router'; // ✅ Importa o roteador

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter(); // ✅ Instancia o roteador

  const handleCategoriaClick = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      })
    ]).start();
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            <Text style={{ color: '#007BFF', fontWeight: '900' }}>Mercado</Text><Text style={{ fontWeight: '900' }}>Aqui</Text>
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput placeholder="Pesquisar" style={styles.searchInput} />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Image
            source={{ uri: 'https://sdmntprwestus.oaiusercontent.com/files/00000000-a67c-6230-a1cf-3fc70cedf6b2/raw?se=2025-05-19T22%3A39%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=02b7f7b5-29f8-416a-aeb6-99464748559d&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-19T18%3A38%3A11Z&ske=2025-05-20T18%3A38%3A11Z&sks=b&skv=2024-08-04&sig=q4meTI7ousj3JwAtERBBCoxMITW3lqaZCwb0seYUJ6c%3D' }}
            style={{ width: '100%', height: 100, borderRadius: 10 }}
          />
        </View>

        {/* Categorias */}
        <View style={{ marginTop: 12 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <Text style={styles.sectionLink}>Ver mais</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {['Mercearia', 'Padaria', 'Bebidas', 'Hortifruti', 'Frios'].map((cat, index) => (
              <TouchableOpacity key={index} onPress={handleCategoriaClick}>
                <Animated.View style={[styles.categoryItem, { opacity: fadeAnim }]}>
                  <Ionicons name="leaf-outline" size={24} color="white" />
                  <Text style={styles.categoryText}>{cat}</Text>
                </Animated.View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Ofertas */}
        <Text style={styles.sectionTitle}>Ofertas</Text>
        <View style={styles.offerGrid}>
          {[{
            nome: 'Arroz Tio Urbano Tipo 5kg',
            preco: '31,49',
            precoAntigo: '44,99',
            desconto: '10%',
            imagem: 'https://static.paodeacucar.com/img/uploads/1/51/659051.jpg'
          },
          {
            nome: 'Leite UHT Piracanjuba 1L',
            preco: '7,49',
            precoAntigo: '9,99',
            desconto: '15%',
            imagem: 'https://static.paodeacucar.com/img/uploads/1/986/32854986.png'
          },
          {
            nome: 'Óleo de Soja Liza 900ml',
            preco: '5,99',
            precoAntigo: '7,99',
            desconto: '25%',
            imagem: 'https://static.paodeacucar.com/img/uploads/1/922/32852922.png'
          },
          {
            nome: 'Feijão Carioca Namorado 1kg',
            preco: '6,89',
            precoAntigo: '8,49',
            desconto: '20%',
            imagem: 'https://static.paodeacucar.com/img/uploads/1/922/32852922.png'
          },
          {
            nome: 'Macarrão Espaguete Renata 500g',
            preco: '3,49',
            precoAntigo: '4,99',
            desconto: '30%',
            imagem: 'https://static.paodeacucar.com/img/uploads/1/522/32848522.png'
          },
          {
            nome: 'Refrigerante Coca-Cola 2L',
            preco: '8,99',
            precoAntigo: '10,99',
            desconto: '18%',
            imagem: 'https://static.paodeacucar.com/img/uploads/1/522/32848522.png'
          }].map((item, index) => (
            <View key={index} style={styles.productCard}>
              <Image source={{ uri: item.imagem }} style={styles.productImage} />
              <Text style={styles.price}>R$ {item.preco}</Text>
              <View style={styles.discountRow}>
                <Text style={styles.discount}>-{item.desconto}</Text>
                <Text style={styles.oldPrice}>R$ {item.precoAntigo}</Text>
              </View>
              <Text style={styles.productName}>{item.nome}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ✅ Botão flutuante redireciona para /lista */}
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
  banner: { marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  sectionLink: { fontSize: 14, color: '#007BFF' },
  categoryScroll: { marginBottom: 24 },
  categoryItem: {
    width: 80, height: 80, backgroundColor: '#007BFF',
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
  discountRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  discount: { color: 'green', fontWeight: 'bold', marginRight: 6 },
  oldPrice: { textDecorationLine: 'line-through', color: '#888' },
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
