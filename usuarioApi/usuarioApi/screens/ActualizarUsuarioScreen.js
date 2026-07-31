import React, { useState } from "react";
import {SafeAreaView,View,Text,TextInput,Pressable,StyleSheet,Alert,Platform} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { apiFetch } from "../utils/api";

export default function ActualizarUsuarioScreen() {
  const { id, nombre, edad } = useLocalSearchParams();

  const [nuevoNombre, setNuevoNombre] = useState(nombre);
  const [nuevaEdad, setNuevaEdad] = useState(String(edad));

  const mostrarMensaje = (titulo, mensaje, alAceptar) => {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n${mensaje}`);
      alAceptar?.();
    } else {
      Alert.alert(titulo, mensaje, alAceptar ? [{ text: "Aceptar", onPress: alAceptar }] : undefined);
    }
  };

  const actualizarUsuario = async () => {
    const edadNumero = Number(nuevaEdad);
    if (nuevoNombre.trim().length < 3 || !Number.isInteger(edadNumero) || edadNumero < 0 || edadNumero > 120) {
      mostrarMensaje("Datos inválidos", "El nombre debe tener al menos 3 letras y la edad debe estar entre 0 y 120");
      return;
    }

    try {
        const respuesta = await apiFetch(`/usuarios/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            nombre: nuevoNombre.trim(),
            edad: edadNumero,
        }),
        });

        const datos = await respuesta.json();

        console.log("Respuesta API:", datos);

        if (!respuesta.ok) {
        mostrarMensaje("Error", datos.detail || "No se pudo actualizar el usuario");
        return;
        }

        mostrarMensaje("Correcto", "Usuario actualizado", () => router.back());

    } catch (error) {
        console.log(error);
        mostrarMensaje("Error", error.message);
    }
    };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Actualizar Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>

        <TextInput
          style={styles.input}
          value={nuevoNombre}
          onChangeText={setNuevoNombre}
        />

        <Text style={styles.label}>Edad</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={nuevaEdad}
          onChangeText={setNuevaEdad}
        />
      </View>

      <Pressable style={styles.boton} onPress={actualizarUsuario}>
        <Text style={styles.textoBoton}>Guardar cambios</Text>
      </Pressable>

      <Pressable
        style={styles.botonCancelar}
        onPress={() => router.back()}
      >
        <Text style={styles.textoBoton}>Cancelar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
  },

  label: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },

  boton: {
    borderWidth: 1,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  botonCancelar: {
    borderWidth: 1,
    padding: 12,
    alignItems: "center",
  },

  textoBoton: {
    fontWeight: "bold",
  },
});
