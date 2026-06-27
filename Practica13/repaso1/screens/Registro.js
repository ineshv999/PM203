import { StatusBar } from "expo-status-bar";
import React,{ useState } from "react";
import { View, ScrollView, Text, TextInput, Alert, Button, StyleSheet, Platform } from "react-native";
import { Switch, Pressable } from 'react-native';

if (Platform.OS === "web") {
  Alert.alert = (titular, mensaje, boton) => {
    const list = Array.isArray(mensaje) ? mensaje : boton;
    if (list) {
      if (window.confirm(titular)) list.find((b) => b.onPress)?.onPress();
    } else {
      window.alert(titular + (mensaje ? "\n" + mensaje : ""));
    }
  };
}

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isEnabled2, setIsEnabled2] = useState(false);

  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

  const [isEnabled3, setIsEnabled3] = useState(false);

  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);

  const registro = () => {
    if (!nombre || !carrera || !semestre) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    if (!semestre.match(/^[0-9]+$/)) {
      Alert.alert("Error", "El numero debe contener solo numeros");
      setSemestre("");
      return;
    }

    Alert.alert(
      `Registrar ${nombre}`,
      "¿Deseas registrar esta información?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () => {
            Alert.alert(
              "Registro de:",
              `Nombre: ${nombre}
    Carrera: ${carrera}
    Semestre: ${semestre}
    Taller: ${isEnabled ? "Sí" : "No"}
    Constancia: ${isEnabled2 ? "Sí" : "No"}
    Deportes: ${isEnabled3 ? "Sí" : "No"}`
            );
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.input}>
        <Text style={styles.Titulo}>Registro de evento universitario</Text>
        {/* nombre del usuario */}
        <TextInput
          style={styles.input}
          placeholder="Ingrese tu nombre"
          placeholderTextColor="#999"
          autoCapitalize="words"
          value={nombre}
          onChangeText={(texto) => setNombre(texto)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese tu carrera"
          placeholderTextColor="#999"
          autoCapitalize="none"
          value={carrera}
          onChangeText={(texto) => setCarrera(texto)}
        />
        <TextInput
        style={styles.input}
        placeholder="ingresa tu semestre "
        placeholderTextColor="#999"
        keyboardType="numeric"
        maxLength={1}
        value={semestre}
        onChangeText={(texto) => setSemestre(texto)}
                />
        
        <Text> Opciones </Text>
        
              <View>
                <Text>¿Asistiras al taller?</Text>
                <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
                disabled ={false}/>
              </View>
              <View>
                <Text>¿Requiere constancia?</Text>
                <Switch
                onValueChange={toggleSwitch2}
                value={isEnabled2}
                disabled ={false}/>
              </View>
              <View>
                <Text>¿Participara en el deporte?</Text>
                <Switch
                onValueChange={toggleSwitch3}
                value={isEnabled3}
                disabled ={false}/>
              </View>

        <Button title="Registrar" onPress={registro} color="#00ff00" />

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 24,
    gap: 12,
  },
  Titulo: {
    padding: 30,
    fontSize: 20,
    alignContent: "stretch",
  },
  input: {
    borderWidth: 3,
    borderColor: "#e6e6e6",
    borderRadius: 3,
    padding: 10,
    fontSize: 15,
    backgroundColor: "#ffffff",
  },
});