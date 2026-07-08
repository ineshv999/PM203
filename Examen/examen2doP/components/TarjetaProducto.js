import { Text, View, Button, StyleSheet , FlatList,TextInput,Pressable,Alert} from "react-native";
import React, { useState, useEffect } from 'react';

export const TarjetaProducto = ({nombre, marca, precio})=>{
    const [opinion, setOpinion] = useState('');
    const [listaOpinion, setListaOpiniones] = useState([]);
    const [vista] = useState('flat');

    const registro = () => {
    
        if (opinion.trim() === '') {
          Alert.alert("Complete todos los campos.");
          return;
        }

        const nuevaOpinion = {
            id: Date.now().toString(),
            opinion
          };
    
        setListaOpiniones(prev => [...prev, nuevaOpinion]);
    

        alert("Registro exitoso");
    
      };

return(

    <View style={styles.tarjeta}>
        <Text>{nombre}</Text>
        <Text>{marca}</Text>
        <Text>{precio}</Text>

        <Text>Opinion del producto</Text>
        
                <TextInput
                  placeholder="Opinion"
                  value={opinion}
                  onChangeText={setOpinion}
                />
        
                <Button
                  title="Agregar opinión"
                  color="#331172"
                  onPress={registro}
                />

        {vista === 'flat' && (

          <FlatList
            data={listaOpinion}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <Text>
                Lista de Opiniones
              </Text>
            }
            ListEmptyComponent={
              <Text>
                No hay opiniones registradas.
              </Text>
            }
            ItemSeparatorComponent={() => (
              <View style={styles.separator} />
            )}

            renderItem={({ item }) => (

              <Pressable>

                <View>

                  <Text>
                    {item.opinion}
                  </Text>

                </View>

              </Pressable>

            )}
          />

        )}

        
    </View>
)

}

const styles = StyleSheet.create({
    tarjeta:{
    borderWidth: 2,
    padding:20,
    margin: 15,

    },

})