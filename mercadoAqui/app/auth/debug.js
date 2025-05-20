// app/auth/debug.js
import { View, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function DebugAdmin() {
  const router = useRouter();
  const [token, setToken] = useState('');

  // Captura temporária do token após login bem-sucedido (modo de demonstração)
  useEffect(() => {
    // Substitua isso pela forma como você armazena o token no app (ex: AsyncStorage, Context, etc.)
    const getToken = async () => {
      const t = window?.localStorage?.getItem('jwt_token');
      if (t) setToken(t);
    };
    getToken();
  }, []);

  const resetarMock = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/resetar-mock', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', data.mensagem || 'Mock reiniciado com sucesso');
      } else {
        Alert.alert('Erro', data.message || 'Algo deu errado ao resetar');
      }
    } catch (error) {
      console.error('Erro ao resetar mock:', error);
      Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Button title="Resetar banco de dados (Mock)" onPress={resetarMock} />
    </View>
  );
}
