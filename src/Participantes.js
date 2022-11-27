import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { retrieveUserSession } from './FormParticipante';

const Participantes = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [erro, setErro] = useState('');

  const buscaParticipantes = () => {
    retrieveUserSession().then(token =>
      fetch('http://192.168.100.128:8080/participante', {
        method: 'GET',
        headers: new Headers({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
      })
        .then(response => {
          if (response.status !== 200) {
            setErro('Erro');
          } else {
            return response.json();
          }
        })
        .then(json => {
          console.log(json);
          setData(json);
          setLoading(false);
        })
        .catch(error => console.error('Exemplo 4 erro: ', error)),
    );
  };

  useEffect(() => {
    buscaParticipantes();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : !erro ? (
        <View style={styles.layout}>
          <Text style={styles.textTitle}>Participantes</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Text>
                {item.id}/{item.nome}/{item.cpf}
              </Text>
            )}
          />
        </View>
      ) : (
        <Text>Erro</Text>
      )}
    </View>
  );
};

export default Participantes;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  layout: { flex: 1, flexDirection: 'column', justifyContent: 'space-between' },
  textTitle: { fontSize: 18, color: 'green', textAlign: 'center' },
  textData: {
    fontSize: 14,
    color: 'green',
    textAlign: 'center',
    paddingBottom: 10,
  },
});
