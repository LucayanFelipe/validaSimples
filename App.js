import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});

  const [confirmarSenha, setConfirmarSenha] = useState('');



  // Máscara CPF (XXX.XXX.XXX-XX)
  const aplicarMascaraCPF = (valor) => {
    valor = valor.replace(/\D/g, ''); // Remove tudo que não é número
    valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return valor.length <= 14 ? valor : valor.substring(0, 14); // Limita o tamanho
  };

  // Máscara CEP (XXXXX-XXX)
  const aplicarMascaraCEP = (valor) => {
    valor = valor.replace(/\D/g, ''); // Remove tudo que não é número
    valor = valor.replace(/^(\d{5})(\d{3})/, '$1-$2');
    return valor.length <= 9 ? valor : valor.substring(0, 9); // Limita o tamanho
  };

  // Máscara Telefone ( (XX) XXXXX-XXXX )
  const aplicarMascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, ''); // Remove tudo que não é número
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    return valor.length <= 15 ? valor : valor.substring(0, 15); // Limita o tamanho
  };

  // Função de validação e formatação
  const validarNome = () => {
    const nomeRegex = /^[a-zA-Z\s]{5,}$/;
    if (nomeRegex.test(nome)) {
      setErros((prev) => ({ ...prev, nome: '' }));
      return true;
    } else {
      setErros((prev) => ({ ...prev, nome: 'Nome deve ter pelo menos 5 caracteres' }));
      return false;
    }
  };

  const validarEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      setErros((prev) => ({ ...prev, email: '' }));
      return true;
    } else {
      setErros((prev) => ({ ...prev, email: 'Email inválido' }));
      return false;
    }
  };

  const validarCPF = () => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (cpfRegex.test(cpf)) {
      setErros((prev) => ({ ...prev, cpf: '' }));
      return true;
    } else {
      setErros((prev) => ({ ...prev, cpf: 'CPF inválido (formato esperado: XXX.XXX.XXX-XX )' }));
      return false;
    }
  };

  const validarCEP = () => {
    const cepRegex = /^\d{5}-\d{3}$/;
    if (cepRegex.test(cep)) {
      setErros((prev) => ({ ...prev, cep: '' }));
      return true;
    } else {
      setErros((prev) => ({ ...prev, cep: 'CEP inválido (formato esperado: XXXXX-XXX )' }));
      return false;
    }
  };

  const validarTelefone = () => {
    const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    if (telefoneRegex.test(telefone)) {
      setErros((prev) => ({ ...prev, telefone: '' }));
      return true;
    } else {
      setErros((prev) => ({ ...prev, telefone: 'Telefone inválido (formato esperado: (XX) XXXXX-XXXX )' }));
      return false;
    }
  };

  const validarSenha = () => {
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*ç).{8,}$/;
    if (senhaRegex.test(senha)) {
      setErros((prev) => ({ ...prev, senha: '' }));
      return true;
    } else {
      setErros((prev) => ({ ...prev, senha: 'Senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais' }));
      return false;
    }
  };

  const validarConfirmarSenha = () => {
    if (confirmarSenha === senha && confirmarSenha !== '') {
      setErros((prev) => ({ ...prev, confirmarSenha: '' }));
      return true;
    } else {
      setErros((prev) => ({ ...prev, confirmarSenha: 'As senhas não coincidem' }));
      return false;
    }
  };
  

  const validarFormulario = () => {
    const isNomeValido = validarNome();
    const isEmailValido = validarEmail();
    const isCpfValido = validarCPF();
    const isCepValido = validarCEP();
    const isTelefoneValido = validarTelefone();
    const isSenhaValida = validarSenha();
    const isConfirmarSenhaValida = validarConfirmarSenha();
  
    if (
      isNomeValido &&
      isEmailValido &&
      isCpfValido &&
      isCepValido &&
      isTelefoneValido &&
      isSenhaValida &&
      isConfirmarSenhaValida
    ) {
      alert('Parabéns digitou direitinho!');
    } else {
      alert('ERRO! verifique o que você errou');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Validação de Formulários</Text>
      <Text style={styles.subtitle}>Formulário Super Simples</Text>
  
      <Text style={styles.text}>Digite seu nome: </Text>
      <TextInput
        style={[styles.input, { color: nome ? 'black' : 'grey' }]}
        placeholder="digite aqui"
        value={nome}
        onChangeText={setNome}
      />
      {erros.nome && <Text style={styles.error}>{erros.nome}</Text>}
  
      <Text style={styles.text}>Digite seu CPF: </Text>
      <TextInput
        style={[styles.input, { color: cpf ? 'black' : 'grey' }]}
        placeholder="digite aqui"
        value={cpf}
        onChangeText={(text) => setCpf(aplicarMascaraCPF(text))}
      />
      {erros.cpf && <Text style={styles.error}>{erros.cpf}</Text>}
  
      <Text style={styles.text}>Digite seu CEP: </Text>
      <TextInput
        style={[styles.input, { color: cep ? 'black' : 'grey' }]}
        placeholder="digite aqui"
        value={cep}
        onChangeText={(text) => setCep(aplicarMascaraCEP(text))}
      />
      {erros.cep && <Text style={styles.error}>{erros.cep}</Text>}
  
      <Text style={styles.text}>Telefone celular com DDD: </Text>
      <TextInput
        style={[styles.input, { color: telefone ? 'black' : 'grey' }]}
        placeholder="digite aqui"
        value={telefone}
        onChangeText={(text) => setTelefone(aplicarMascaraTelefone(text))}
      />
      {erros.telefone && <Text style={styles.error}>{erros.telefone}</Text>}
  
      <Text style={styles.text}>E-mail: </Text>
      <TextInput
        style={[styles.input, { color: email ? 'black' : 'grey' }]}
        placeholder="digite aqui"
        value={email}
        onChangeText={setEmail}
      />
      {erros.email && <Text style={styles.error}>{erros.email}</Text>}
  
      <Text style={styles.text}>
        Senha de 8 dígitos (mín. 1 letra minúscula, 1 maiúscula, 1 número, 1 caractere especial):
      </Text>
      <TextInput
        style={[styles.input, { color: senha ? 'black' : 'grey' }]}
        placeholder="digite aqui"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {erros.senha && <Text style={styles.error}>{erros.senha}</Text>}
  
      <Text style={styles.text}>Confirme sua senha: </Text>
      <TextInput
        style={[styles.input, { color: confirmarSenha ? 'black' : 'grey' }]}
        placeholder="digite novamente a senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />
      {erros.confirmarSenha && <Text style={styles.error}>{erros.confirmarSenha}</Text>}
  
      <TouchableOpacity style={styles.validar} onPress={validarFormulario}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Validar</Text>
      </TouchableOpacity>
  
      <StatusBar style="auto" />
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#F0F4F8',
  },
  
  content: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#F0F4F8', // Fundo suave
  },
  text: {
    width:"90%",
    fontSize: 20,
    marginBottom: 10,
    color: '#2C3E50', // Texto escuro
  },
  input: {
    width:"90%",
    backgroundColor: '#E8F0FE', // Azul claro para inputs
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#A9CCE3',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: '#1A5276', // Azul escuro
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 30,
    color: '#2980B9', // Azul intermediário
  },
  validar: {
    width:"90%",
    marginTop: 70,
    fontSize: 18,
    padding: 10,
    backgroundColor: '#1A5276',
    color: 'white',
    textAlign: 'center',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
});

