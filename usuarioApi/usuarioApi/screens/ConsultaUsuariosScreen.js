import React, {useCallback, useState} from 'react';
import {SafeAreaView,View,Text,FlatList,StyleSheet,Pressable,} from 'react-native';
import { router, useFocusEffect } from "expo-router";
import { apiFetch } from "../utils/api";

export default function ConsultaUsuariosScreen() {

  const [usuarios, setUsuarios] = useState([]);
  const obtenerUsuarios = async () => {
  try {
      const respuesta = await apiFetch("/usuarios/");

      const datos = await respuesta.json();

      console.log(datos);

      if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los usuarios");
      }

      setUsuarios(datos.usuarios || []);

    } catch (error) {
      console.log("Error API:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [])
  );

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>

      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.linea}></View>

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>

  <Pressable
      onPress={() =>
          router.push({
              pathname: "/detalle",
              params: {
                  id: item.id,
                  nombre: item.nombre,
                  edad: item.edad,
              },
          })
      }
  >
      <Text style={styles.detalles}>
          Ver detalles →
      </Text>
  </Pressable>

    </View>
  );

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },
  detalles:{
    color:"#2563EB",
    fontWeight:"bold",
    alignSelf:"flex-end",
    marginTop:10
  },

});
