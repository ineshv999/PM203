import React from "react";
import {SafeAreaView,View,Text,Pressable,StyleSheet,Alert,Platform,} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { apiFetch } from "../utils/api";

export default function DetalleUsuarioScreen() {
  const { id, nombre, edad } = useLocalSearchParams();

  const eliminarUsuario = async () => {
    if (Platform.OS === "web") {
      if (window.confirm("¿Deseas eliminar este usuario?")) {
        await confirmarEliminacion();
      }
      return;
    }

    Alert.alert(
        "Eliminar","¿Deseas eliminar este usuario?",
        [
        {
            text: "Cancelar",
            style: "cancel",
        },
        {
            text: "Eliminar",
            style: "destructive",
            onPress: confirmarEliminacion,
        },
        ]
    );
    };

  const mostrarMensaje = (titulo, mensaje, alAceptar) => {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n${mensaje}`);
      alAceptar?.();
    } else {
      Alert.alert(titulo, mensaje, alAceptar ? [{ text: "Aceptar", onPress: alAceptar }] : undefined);
    }
  };

  async function confirmarEliminacion() {
    try {
      const respuesta = await apiFetch(`/usuarios/${id}`, { method: "DELETE" });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        mostrarMensaje("Error", datos.detail || datos.message || "No se pudo eliminar el usuario");
        return;
      }

      mostrarMensaje("Correcto", "Usuario eliminado", () => router.back());
    } catch (error) {
      console.log(error);
      mostrarMensaje("Error", error.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Detalle del Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{nombre}</Text>

        <Text style={styles.label}>Edad</Text>
        <Text style={styles.valor}>{edad}</Text>
      </View>

      <Pressable
        style={styles.botonActualizar}
        onPress={() =>
          router.push({
            pathname: "/actualizar",
            params: {
              id,
              nombre,
              edad,
            },
          })
        }
      >
        <Text style={styles.textoBoton}>Actualizar</Text>
      </Pressable>

      <Pressable
        style={styles.botonEliminar}
        onPress={eliminarUsuario}
      >
        <Text style={styles.textoBoton}>Eliminar</Text>
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
  },

  valor: {
    fontSize: 18,
    marginBottom: 10,
  },

  botonActualizar: {
    borderWidth: 1,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  botonEliminar: {
    borderWidth: 1,
    padding: 12,
    alignItems: "center",
  },

  textoBoton: {
    fontWeight: "bold",
  },
});
