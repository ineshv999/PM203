/* Zona 1: Importanciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import Registro from './Registro';

/* Zona 2: Main - Hogar de los componentes */
export default function Menu() {
    const [screen, setScreen] = useState('menu');

    switch(screen){
        case 'registro':
            return <Registro/>
        case 'menu':
            default:
                return (
                    <View style={styles.container}>

                        <Text>Opciones: </Text>

                        <Button title="Registrar" onPress={() => setScreen('registro')} />

                        <StatusBar style="auto" />

                    </View>
                );
    }
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
