import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const LoadDataFromjsonplaceholder = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.layout}>
          <Text style={styles.textTitle}>UserData</Text>
          <Text style={styles.textData}>User Information:</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Text>
                {item.id +
                  '.Name:- ' +
                  item.name +
                  '\nEmail:-' +
                  item.email +
                  '\nCity:-' +
                  item.address.city +
                  '\nWebSite:-' +
                  item.website +
                  '\n'}
              </Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default LoadDataFromjsonplaceholder;

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
