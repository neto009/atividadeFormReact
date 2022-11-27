import { useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

export async function retrieveUserSession() {
  try {
    const token = await EncryptedStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('error', error);
  }
}

const FormParticipante = () => {
  const [nome, setNome] = useState('teste');
  const [cpf, setCpf] = useState('123.456.789-00');
  const [cadastrado, setCadastrado] = useState(false);
  const [erro, setErro] = useState('');
  const [enviado, setEnviado] = useState(false);

  const novoParticipante = () => {
    setEnviado(true);
    retrieveUserSession().then(token =>
      fetch('http://192.168.100.128:8080/participante', {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          cpf: cpf,
          nome: nome,
        }),
      })
        .then(response => {
          console.log('Retorno: ', response);
          if (response.status === 200) {
            setCadastrado(true);
          } else {
            setErro(response.status.toString());
            console.log('Erro: ', response.status);
          }
          console.log('resposta: ', response.status);
        })
        .catch(error => {
          setErro(error);
          console.error('error', error);
        }),
    );
  };

  return (
    <View style={{ padding: 10 }}>
      {!enviado ? (
        <>
          <TextInput
            style={{ height: 40 }}
            onChangeText={texto => setNome(texto)}
            value={nome}
          />
          <TextInput
            style={{ height: 40 }}
            onChangeText={texto => setCpf(texto)}
            value={cpf}
            keyboardType="numeric"
          />
          <Button
            title="Enviar"
            onPress={() => {
              novoParticipante();
            }}
          />
        </>
      ) : !cadastrado && !erro ? (
        <ActivityIndicator size="large" />
      ) : !erro ? (
        <Text>Participante cadastrado com sucesso!</Text>
      ) : (
        <Text>Operação com problemas!</Text>
      )}
    </View>
  );
};

export default FormParticipante;
