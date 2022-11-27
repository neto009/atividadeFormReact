import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadDataFromjsonplaceholder from './src/LoadDataFromjsonplaceholder';
import LogIn from './src/LogIn';
import FormParticipante from './src/FormParticipante';
import Indice from './src/Indice';
import Participantes from './src/Participantes';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Indice" component={Indice} />
        <Stack.Screen
          name="Exemplo 1"
          component={LoadDataFromjsonplaceholder}
        />
        <Stack.Screen name="Exemplo 2" component={LogIn} />
        <Stack.Screen name="Exemplo 3" component={FormParticipante} />
        <Stack.Screen name="Exemplo 4" component={Participantes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
