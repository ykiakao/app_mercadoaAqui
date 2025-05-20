import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import ModalConfirmacao from '../components/ModalConfirmacao';

export default function Register() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erros, setErros] = useState({ nome: false, email: false, senha: false, confirmar: false });
  const [mensagemErro, setMensagemErro] = useState('');
  const [modalConfirmacao, setModalConfirmacao] = useState(false);

  const validarCadastro = async () => {
    const camposInvalidos = {
      nome: nome.trim() === '',
      email: email.trim() === '',
      senha: senha.trim() === '',
      confirmar: confirmarSenha.trim() === ''
    };

    setErros(camposInvalidos);

    if (Object.values(camposInvalidos).some(Boolean)) {
      setMensagemErro('Preencha todos os campos.');
      return;
    }

    if (senha.length < 6) {
      setMensagemErro('A senha deve ter pelo menos 6 caracteres.');
      setErros((e) => ({ ...e, senha: true }));
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagemErro('As senhas não coincidem.');
      setErros((e) => ({ ...e, senha: true, confirmar: true }));
      return;
    }

    if (!aceitouTermos) {
      setMensagemErro('Você precisa aceitar os termos de uso.');
      return;
    }

    setMensagemErro('');

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });

      if (response.ok) {
        setModalConfirmacao(true);
      } else {
        const erro = await response.json();
        setMensagemErro(erro.message || 'Erro no cadastro.');
      }
    } catch (err) {
      setMensagemErro('Erro ao conectar com o servidor.');
    }
  };

  const irParaLogin = () => {
    router.replace('/auth/login');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, padding: 20, paddingTop: 60, backgroundColor: 'white' }}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: 180,
            height: 180,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginBottom: 10
          }}
        />

        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Cadastro</Text>

        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={{
            borderWidth: 1,
            borderColor: erros.nome ? '#d32f2f' : '#ccc',
            borderRadius: 8,
            marginBottom: 12,
            padding: 10
          }}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderColor: erros.email ? '#d32f2f' : '#ccc',
            borderRadius: 8,
            marginBottom: 12,
            padding: 10
          }}
        />

        {/* Campo senha */}
        <View style={{ position: 'relative' }}>
          <TextInput
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
            style={{
              borderWidth: 1,
              borderColor: erros.senha ? '#d32f2f' : '#ccc',
              borderRadius: 8,
              marginBottom: 12,
              padding: 10,
              paddingRight: 40,
            }}
          />
          <TouchableOpacity
            onPress={() => setMostrarSenha(!mostrarSenha)}
            style={{ position: 'absolute', right: 10, top: 10 }}
          >
            <Ionicons
              name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Campo confirmar senha */}
        <View style={{ position: 'relative' }}>
          <TextInput
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={!mostrarConfirmarSenha}
            style={{
              borderWidth: 1,
              borderColor: erros.confirmar ? '#d32f2f' : '#ccc',
              borderRadius: 8,
              marginBottom: 20,
              padding: 10,
              paddingRight: 40,
            }}
          />
          <TouchableOpacity
            onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
            style={{ position: 'absolute', right: 10, top: 10 }}
          >
            <Ionicons
              name={mostrarConfirmarSenha ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Checkbox
            value={aceitouTermos}
            onValueChange={setAceitouTermos}
            color={aceitouTermos ? '#007BFF' : undefined}
          />
          <Text style={{ fontSize: 13, marginLeft: 8 }}>
            Li e aceito os <Text style={{ color: '#007BFF' }}>termos de uso</Text>
          </Text>
        </View>

        {mensagemErro !== '' && (
          <Text style={{ color: '#d32f2f', textAlign: 'center', marginBottom: 12 }}>
            {mensagemErro}
          </Text>
        )}

        <Button title="Cadastrar" color="#007BFF" onPress={validarCadastro} />

        <TouchableOpacity onPress={irParaLogin} style={{ marginTop: 20 }}>
          <Text style={{ color: '#007BFF', textAlign: 'center' }}>
            Já tem conta? Fazer login
          </Text>
        </TouchableOpacity>

        <ModalConfirmacao
          visivel={modalConfirmacao}
          mensagem="Cadastro realizado com sucesso!"
          submensagem="Você será redirecionado para o login."
          onFechar={() => {
            setModalConfirmacao(false);
            router.replace('/auth/login');
          }}
        />
      </View>
    </ScrollView>
  );
}
