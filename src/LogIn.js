import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const LogIn = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, onChangeUser] = useState('teste-a');
  const [pwd, onChangePwd] = useState('123456');
  const [erro, setErro] = useState('');

  const submit = () => {
    const Buffer = require('buffer').Buffer;
    let encodedAuth = new Buffer(user + ':' + pwd).toString('base64');
    fetch('http://192.168.100.128:8080/token', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Basic ' + encodedAuth,
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.text())
      .then(result => {
        if (!result) setErro("Usuário não encontrado!");
        setLoading(false);
        storeUserSession(result);
        console.log(result);
      })
      .catch(error => console.log('error', error));
  };

  async function storeUserSession(token) {
    try {
      await EncryptedStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <TextInput
            onChangeText={onChangeUser}
            value={user}
            style={{ height: 40 }}
            placeholder="Usuário"
          />
          <TextInput
            onChangeText={onChangePwd}
            value={pwd}
            style={{ height: 40 }}
            placeholder="Senha"
          />
          <Button
            onPress={() => {
              submit();
            }}
            title="Enviar"
          />
        </View>
      ) : !erro ? (
        <View style={styles.layout}>
          <Text style={styles.textTitle}>
            Usuário autenticado e token salvo
          </Text>
        </View>
      ) : (
        <Text>Erro: {erro}</Text>
      )}
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  layout: { flex: 1 },
  textTitle: { fontSize: 18, color: 'green', textAlign: 'center' },
  textData: {
    fontSize: 10,
    color: 'gray',
    textAlign: 'left',
  },
});
