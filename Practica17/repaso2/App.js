/* Zona 1: Importaciones */
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  Image,
  FlatList,
  TextInput,
  Pressable,
  Alert
} from 'react-native';

/* Zona 2: Main */
export default function App() {

  const [fondo] = useState(require('./assets/fondo.jpg'));
  const [splash, setSplash] = useState(true);

  const [nombre, setNombre] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');

  const [listaLibros, setListaLibros] = useState([]);
  const [vista] = useState('flat');

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);

  const registro = () => {

    if (nombre.trim() === '' || autor.trim() === '' || genero.trim() === '') {
      alert("Complete todos los campos.");
      return;
    }

    const nuevoLibro = {
      id: Date.now().toString(),
      nombre,
      autor,
      genero,
    };

    setListaLibros([...listaLibros, nuevoLibro]);

    setNombre('');
    setAutor('');
    setGenero('');

    Alert.alert(
    "Registro exitoso");
  };

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  if (splash) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require('./assets/arbol.png')}
          resizeMode="contain"
          style={styles.logo}
        />

        <Text style={styles.carga}>Cargando...</Text>

        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={fondo}
      style={styles.fondo}
      resizeMode="cover"
    >

      <View style={styles.container}>

        <Text style={styles.Titulo}>
          Registro de Libros
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Título del libro"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={autor}
          onChangeText={setAutor}
        />

        <TextInput
          style={styles.input}
          placeholder="Género"
          value={genero}
          onChangeText={setGenero}
        />

        <Button
          title="Agregar libro"
          color="#331172"
          onPress={registro}
        />

        <Text style={styles.footer}>
          Total de libros: {listaLibros.length}
        </Text>

        {vista === 'flat' && (

          <FlatList
            data={listaLibros}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <Text style={styles.header}>
                Lista de Libros
              </Text>
            }
            ListEmptyComponent={
              <Text style={styles.vacio}>
                No hay libros registrados.
              </Text>
            }
            ItemSeparatorComponent={() => (
              <View style={styles.separator} />
            )}

            renderItem={({ item }) => (

              <Pressable
                style={styles.item}
                onPress={() => toggleFavorito(item.id)}
              >

                <View>

                  <Text style={styles.itemTitulo}>
                    {item.nombre}
                  </Text>

                  <Text style={styles.itemTexto}>
                    Autor: {item.autor}
                  </Text>

                  <Text style={styles.itemTexto}>
                    Género: {item.genero}
                  </Text>

                </View>

              </Pressable>

            )}
          />

        )}

      </View>

      <StatusBar style="auto" />

    </ImageBackground>
  );
}

/* Zona 3: Estilos */

const styles = StyleSheet.create({

  fondo: {
    flex: 1,
    width: '100%',
  },

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  Titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#331172',
  },

  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },

  footer: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#331172',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    color: '#331172',
  },

  vacio: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },

  separator: {
    height: 10,
  },

  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },

  itemTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  itemTexto: {
    fontSize: 15,
    color: '#555',
    marginTop: 3,
  },

  estrella: {
    fontSize: 28,
  },

  splashContainer: {
    flex: 1,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 170,
    height: 170,
  },

  carga: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  },

});