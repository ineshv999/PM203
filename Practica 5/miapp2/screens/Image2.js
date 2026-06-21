/* Zona 1: Importanciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

/* Zona 2: Main - Hogar de los componentes */
export default function Image2() {
  const [splash, setSplash] = useState(false);

  useEffect(() => {async function cargarDatos() {

      await new Promise(resolve =>setTimeout(resolve, 3000));
        setSplash(true);
        await SplashScreen.hideAsync();
    }

    cargarDatos();

  }, []);

  if(!splash){
    return(
    <View>
          
          <Text style={styles.splashScreen}>Cargando... NADA</Text>
          <Image source={require('../assets/wave.png')}></Image>
          <StatusBar style="auto" />
    
        </View>
    );
  }

  return (

    <View style={styles.container}>
      
      <Text> Bienvenidos</Text>
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
