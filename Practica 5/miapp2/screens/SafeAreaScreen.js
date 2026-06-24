/* Zona 1: Importanciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import React,{ useState } from 'react';
import { SafeAreaView, ScrollView, Pressable } from 'react-native';

/* Zona 2: Main - Hogar de los componentes */
export default function SafeAreaScreen() {
  const[mensaje, setMensaje] = useState(
    'Bienvenidos a nuestra practica de SafeAreaView y ScrollView');

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="auto"></StatusBar>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={true}>
        <Text style={styles.titulo}>Practica: SafeAreaView y ScrollView</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.subtitulo}> 
          Integrantes:
        </Text>
        <Text style={styles.texto}>
          Rafa
          Mary
          Gabo
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.subtitulo}> 
          Hobbies
        </Text>
        <Text style={styles.texto}>
          Leer
          Comer
          Jugar
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.subtitulo}> 
          Comidas favoritas
        </Text>
        <Text style={styles.texto}>
          Enchiladas
          Tacos
          Pizza
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.subtitulo}> 
          Colores favoritos
        </Text>
        <Text style={styles.texto}>
          Azul
          Blanco
          Rosa
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.subtitulo}> 
          Animales favoritos
        </Text>
        <Text style={styles.texto}>
          Pantera
          Conejo 
          Perro
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.subtitulo}> 
          Peliculas favoritos
        </Text>
        <Text style={styles.texto}>
          It
          El diablo viste a la moda
          Shrek
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.subtitulo}> 
          Informacion Extra
        </Text>
        <Text style={styles.texto}>
          Este ejemplo demuestra el uso de SafeAreView y ScrollView
        </Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.subtitulo}> 
          Ejemplo de State
        </Text>
        <Text style={styles.texto}>
          {mensaje}
        </Text>
      </View>


      <Pressable style={styles.boton} onPress={() => setMensaje('El state cambio correctamente')}>
        <Text style={styles.textoBoton}> Cambiar Mensaje </Text>
      </Pressable>

      </ScrollView>

    </SafeAreaView>
  );
}

/* ESTILOS */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },

  scrollContainer: {
    padding: 20,
    paddingTop: 35,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0F172A',
    marginTop: 10,
    marginBottom: 20,
  },

  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    elevation: 5,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 10,
  },

  texto: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },

  boton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },

  textoBoton: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

});