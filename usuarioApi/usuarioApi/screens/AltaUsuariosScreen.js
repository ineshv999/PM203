import React, { useState } from 'react';
import {View,SafeAreaView,Text,TextInput,Pressable,StyleSheet,Alert, Platform,} from 'react-native';
import { apiFetch } from '../utils/api';

export default function App() {

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (titulo, mensaje)=>{
    if(Platform.OS === 'web'){
      window.alert(`${titulo}\n${mensaje} `);
    }else{
      Alert.alert(titulo, mensaje)
    }

  };


  const guardarUsuarios = async()=>{

    if(nombre.trim()==='' || edad.trim()==='' ){
      mostrarMensaje("Campos vacíos", "Todos los campos son obligatorios");
      return;
    }

    const edadNumero = Number(edad);
    if (!Number.isInteger(edadNumero) || edadNumero < 0 || edadNumero > 120) {
      mostrarMensaje("Edad inválida", "Escribe una edad entre 0 y 120");
      return;
    }

    try{
      setCargando(true)
      const respuesta = await apiFetch('/usuarios/', {
          method:"POST",
          body: JSON.stringify({nombre: nombre.trim(), edad: edadNumero})
        });

      const datos = await respuesta.json();
      console.log(datos);

      if (!respuesta.ok) {
        throw new Error(datos.detail?.[0]?.msg || datos.detail || "No se pudo guardar el usuario");
      }

      mostrarMensaje("Éxito", "Se guardó el usuario");

      setNombre('');
      setEdad('');

    }catch(error){
      console.log("Error API: ", error);
      mostrarMensaje("Error", error.message || "No fue posible guardar el usuario");
    }finally{
      setCargando(false);
    }

  };

  


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.titulo}>
          Registro de Usuarios
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <Pressable style={styles.boton} onPress={guardarUsuarios} disabled={cargando}>
          <Text style={styles.textoBoton}>
            {cargando ? "Guardando..." : "Agregar Usuario"}
          </Text>
        </Pressable>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    elevation: 5, 
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1F2937',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
  },

  boton: {
    backgroundColor: '#29bb0c',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

});
