import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

export default function ConsultaScreen() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerVehiculos = async()=>{
    try{
      const respuesta = await fetch('https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/vehiculos');
      const datos = await respuesta.json();
      console.log("Respuesta API: ", datos);
      setVehiculos(datos.vehiculos || []);

    }catch(error){
      console.log("Error API: ", error);

    }
    
  };  

  useEffect(()=>{obtenerVehiculos()},[])

  const renderVehiculo = ({ item }) => {
  // Manejo de la propiedad 'anio' o 'año'
    const anioVehiculo = item.anio && item.anio > 1900 ? item.anio : (item.año || 'N/A');

    return (
      <TouchableOpacity 
        style={styles.card}
        // Cambia esto a la función para ver detalle o descompón el evento
        onPress={() => console.log('Vehículo seleccionado:', item.id)}
      >
        <Text style={styles.title}>
          {(item.marca || 'Vehículo').trim()} - {(item.modelo || 'Sin Modelo').trim()}
        </Text>
        <Text style={styles.subtitle}>
          Año: {anioVehiculo} | Color: {(item.color || 'N/A').trim()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catálogo de Vehículos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={vehiculos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVehiculo}
          ListEmptyComponent={<Text style={styles.empty}>No hay vehículos registrados</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, marginTop: 10 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' }
});