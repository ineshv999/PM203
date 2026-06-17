/* Zona 1: Importanciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Saludo } from './components/Saludo';
import { Saludo2 } from './components/Saludo2';
import { Perfil } from './components/Perfil';

/* Zona 2: Main - Hogar de los componentes */
export default function App() {
  return (
    <View style={styles.container}>

      <Perfil 
      nombre="Ines" 
      carrera="Sistemas"
      materia="Programacion movil" 
      cuatri="9"
      estiloExt={styles.tarjetaRoja}
      >
      </Perfil>

      <Perfil 
      nombre="Ines2" 
      carrera="Sistemas"
      materia="Programacion movil" 
      cuatri="9"
      estiloExt={styles.tarjetaVerde}
      />

      <Perfil 
      nombre="Ines3" 
      carrera="Sistemas"
      materia="Programacion movil" 
      cuatri="9"
      estiloExt={styles.tarjetaRoja}
      />
      
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
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  tarjetaRoja:{backgroundColor: '#FF6B6B',},
  tarjetaVerde:{backgroundColor: '#6BCB77',},
});
