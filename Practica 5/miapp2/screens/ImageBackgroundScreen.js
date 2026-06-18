/* Zona 1: Importanciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';

/* Zona 2: Main - Hogar de los componentes */
export default function ImageBackgroundScreen() {
  return (
    <View style={styles.container}>
      
      <Text> Aqui va la practica de ImageBackground</Text>
      <StatusBar style="auto" />

    </View>
  );
}

/* Zona 3: Estilos y Posicionamiento  */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
