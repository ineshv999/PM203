import { Button, Image, Text, View } from "react-native";

export const Saludo2=()=>{
    return(
        <View>
            <Image source={require('../assets/wave.png')}/>
            <Text> Soy un componente compuesto</Text>
            <Button title="Hola S203"> </Button>
        </View>
    )
}

