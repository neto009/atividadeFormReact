import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

async function removeUserSession() {
  try {
    await EncryptedStorage.removeItem('token');
  } catch (error) {
    console.log(error);
  }
}

const Indice = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Exemplo 1')}>
        <Text style={styles.texto}>Carregar dados</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Exemplo 2')}>
        <Text style={styles.texto}>Realizar login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Exemplo 3')}>
        <Text style={styles.texto}>Formulário</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Exemplo 4')}>
        <Text style={styles.texto}>Participantes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeUserSession()}>
        <Text style={styles.texto}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Indice;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  texto: {
    marginLeft: 16,
    marginTop: 20,
    backgroundColor: 'green',
    maxWidth: 120,
    padding: 8,
    borderColor: '#005500',
    borderWidth: 2,
    color: 'white',
  },
});
