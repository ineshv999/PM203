/* Zona 1: Importanciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
import ModalScreen from './ModalScreen';
import PressableScreen from './PressableScreen';
import SafeAreaScreen from './SafeAreaScreen';
import TextInputScreen from './TextInputScreen';
import TarjetasScreen from './TarjetasScreen';

/* Zona 2: Main - Hogar de los componentes */
export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');

    switch(screen){
        case 'tarjetas':
            return <TarjetasScreen/>
        case 'safeArea':
            return <SafeAreaScreen/>
        case 'pressable':
            return <PressableScreen/>
        case 'textInput':
            return <TextInputScreen/>
        case 'flatList':
            return <FlatListScreen/>
        case 'imageBackground':
            return <ImageBackgroundScreen/>
        case 'activityIndicator':
            return <ActivityIndicatorScreen/>
        case 'modal':
            return <ModalScreen/>
        case 'menu':
            default:
                return (
                    <View style={styles.container}>

                        <Text>Menu de Practicas: </Text>

                        <Button style={styles.menu} title="Practica: Tarjetas" onPress={() => setScreen('tarjetas')} />
                        <Button title="Practica: Safe Area" onPress={() => setScreen('safeArea')} />
                        <Button title="Practica: Pressable" onPress={() => setScreen('pressable')} />
                        <Button title="Practica: TextInput" onPress={() => setScreen('textInput')} />
                        <Button title="Practica: FlatList" onPress={() => setScreen('flatList')} />
                        <Button title="Practica: ImageBackground" onPress={() => setScreen('imageBackground')} />
                        <Button title="Practica: ActivityIndicator" onPress={() => setScreen('activityIndicator')} />
                        <Button title="Practica: Modal" onPress={() => setScreen('modal')} />

                        <StatusBar style="auto" />

                    </View>
                );
    }
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
