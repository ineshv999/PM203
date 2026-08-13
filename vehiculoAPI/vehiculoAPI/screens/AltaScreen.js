import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, } from 'react-native';
import { router } from 'expo-router';

export default function AltaScreen() {

    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [año, setAño] = useState('');
    const [color, setColor] = useState('');
    const [cargando, setCargando] = useState(false);

  
    const mostrarMensaje = (titulo, mensaje)=>{
      if(Platform.OS === 'web'){
        window.alert(`${titulo}\n${mensaje} `);
      }else{
        Alert.alert(titulo, mensaje)
      }
  
    };
  
    const GuardarVehiculo = async () => {
  
      if(marca.trim()==='' || modelo.trim()==='' || año.trim()==='' || color.trim()==='' ){
        mostrarMensaje("Campos vacíos", "Todos los campos son obligatorios");
        return;
      }
  
      const añoNumero = Number(año);
      if (!Number.isInteger(añoNumero) || añoNumero < 1886 || añoNumero > new Date().getFullYear()) {
        mostrarMensaje("Año inválido", "Escribe un año entre 1886 y el año actual");
        return;
      }
  
      try{
        setCargando(true)
        const respuesta = await fetch('https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/vehiculos',
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({marca:marca, modelo:modelo, año:año, color:color})
        });
  
        const datos = await respuesta.json();
        console.log(datos);
  
        if (!respuesta.ok) {
          throw new Error(datos.detail?.[0]?.msg || datos.detail || "No se pudo guardar el vehículo");
        }
  
        mostrarMensaje("Éxito", "Se guardó el vehículo");
  
        setMarca('');
        setModelo('');
        setAño('');
        setColor('');
  
      }catch(error){
        console.log("Error API: ", error);
        mostrarMensaje("Error", error.message || "No fue posible guardar el vehículo");
      }finally{
        setCargando(false);
      }
  
    };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alta de Vehículo</Text>

      <TextInput style={styles.input} placeholder="Marca (ej. Toyota)" value={marca} onChangeText={setMarca} />
      <TextInput style={styles.input} placeholder="Modelo (ej. Corolla)" value={modelo} onChangeText={setModelo} />
      <TextInput style={styles.input} placeholder="Año (ej. 2024)" keyboardType="numeric" value={año} onChangeText={setAño} />
      <TextInput style={styles.input} placeholder="Color (ej. Rojo)" value={color} onChangeText={setColor} />

      <TouchableOpacity style={styles.btn} >
        <Text style={styles.btnText} onPress={GuardarVehiculo}>Guardar Vehículo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  btn: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});