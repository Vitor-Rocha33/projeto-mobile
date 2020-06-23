import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export default function Main() {
    const [currentRegion, setCurrentRegion] = useState(null)

    useEffect(() => {   /* Função que roda assim que a aplicação e iniciada */ 
        async function loadInitialPosition() {
            let { granted } = await Location.requestPermissionsAsync()  /* Solicitação de permissão do usuario para adquirir localização*/ 

            if(granted) { /* Verifica se o usuario deu permissão de sua localização*/ 
                let { coords } = await Location.getCurrentPositionAsync({   /* Adquiri coordenadas do usuario como ele tenha dado permissão */ 
                    enableHighAccuracy: true, /*adquire coordenadas pelo gps do usuario */ 
                })

                let { latitude, longitude } = coords 
                
                setCurrentRegion({  /*seta a variavel com os dados do usuario */ 
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitialPosition(); /* Chama a função */ 
    }, [])

    if (!currentRegion) { /* Caso o usuario não permita, ele retorna null */ 
        return null
    }
    return (  /* Criação do mapa informando a localização usuario */ 
        <MapView initialRegion={currentRegion} style={styles.map}>  
            <Marker 
                coordinate={{ latitude: currentRegion.latitude , longitude: currentRegion.longitude }} 
                title='Sua posicao'
            />
        </MapView>
    )
}


/* Estilos apresentados */ 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
        flex:1,
        marginLeft: 5
    }
    
  });