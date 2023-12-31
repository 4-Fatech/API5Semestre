import React, { useState, useEffect, useContext, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Region, Circle, Callout } from "react-native-maps";
import { Dimensions, Text, View, TextInput, StyleSheet, Button, Alert } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { apiurl } from "../../../Helpers/ApiUrl";
import { GlobalContext } from "../../../Context/GlobalProvider";

const { width, height } = Dimensions.get("window");

interface MarkerData {
  id: string;
  name: string;
  key: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  pinColor: string;
}

export const MapaComponente = ({ route, navigation }: any) => {
  const context = useContext(GlobalContext);
  const token = context?.token || "";
  const { user }: any = useContext(GlobalContext);
  const profile = user.profile;
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [filterText, setFilterText] = useState("");
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [circleRadius, setCircleRadius] = useState(10000); // 10 km em metros
  const markerCounter = useRef(0);


  // const newMarker = (e: any) => {
  //   const newMarkerData: MarkerData = {
  //     id: '555555',
  //     name: 'me',
  //     key: `marker_${markerCounter.current}`,
  //     coords: {
  //       latitude: e.nativeEvent.coordinate.latitude,
  //       longitude: e.nativeEvent.coordinate.longitude,
  //     },
  //     pinColor: "#FF0000",
  //   };
  //   setRegion({
  //     latitude: e.nativeEvent.coordinate.latitude,
  //     longitude: e.nativeEvent.coordinate.longitude,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   });
  //   setMarkers((oldMarkers) => [...oldMarkers, newMarkerData]);
  //   markerCounter.current += 1;

  // };

  // função é usada para verificar se um equipamento está dentro do raio de 10 km do usuário comum.
  function calcularDistancia(coord1: { latitude: number, longitude: number }, coord2: { latitude: number, longitude: number }): number {
    const R = 6371; // Raio da Terra em km
    const dLat = deg2rad(coord2.latitude - coord1.latitude);
    const dLon = deg2rad(coord2.longitude - coord1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(coord1.latitude)) * Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia em km
    return distance;
  }

  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  function getEquipamentos() {
    const url = apiurl + "/equipment/list";

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro na solicitação à API');
        }
        return resposta.json();
      })
      .then((data) => {
        let uniqueKey = markers.length + 1;
        const newMarkersArray: MarkerData[] = [];

        const filteredEquipment = data.filter((element: any) => {
          const tipoFiltrado = element.tipo.toLowerCase();
          const serialFiltrado = element.serial;
          const modeloFiltrado = element.modelo.toLowerCase();

          return tipoFiltrado.includes(filterText.toLowerCase()) || serialFiltrado.includes(filterText.toLowerCase()) || modeloFiltrado.includes(filterText.toLowerCase());
        });

        // Checar se o usuário é admin
        if (profile === 'admin') {
          // lista todos os equipamentos
          filteredEquipment.forEach((element: any) => {
            if (element.latitude && element.longitude) {
              const newMarkerData: MarkerData = {
                id: element.id,
                name: element.tipo,
                key: `marker_${uniqueKey}`,
                coords: {
                  latitude: Number.parseFloat(element.latitude),
                  longitude: Number.parseFloat(element.longitude)
                },
                pinColor: "#FF0000",
              };
              newMarkersArray.push(newMarkerData);
              uniqueKey++;
            }
          });
        } else {
          // Listar os equipamentos em até 10Km
          const userLocation = region || { latitude: 0, longitude: 0 };

          filteredEquipment.forEach((element: any) => {
            if (element.latitude && element.longitude) {
              const equipmentLocation = {
                latitude: Number.parseFloat(element.latitude),
                longitude: Number.parseFloat(element.longitude)
              };

              const distance = calcularDistancia(userLocation, equipmentLocation);

              if (distance <= 10) {
                const newMarkerData: MarkerData = {
                  key: `marker_${uniqueKey}`,
                  coords: equipmentLocation,
                  pinColor: "#FF0000",
                  id: element.id,
                  name: element.tipo
                };
                newMarkersArray.push(newMarkerData);
                uniqueKey++;
              }
            }
          });
        }

        setMarkers(newMarkersArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function getMyLocation() {
    Geolocation.getCurrentPosition(
      (info) => {
        const userRegion: Region = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        setLocationLoaded(true); // Indica que a localização foi carregada

        if (region?.latitude !== userRegion.latitude || region?.longitude !== userRegion.longitude) {
          setRegion(userRegion);
        }

      },
      (error) => {
        console.log("Erro ao obter a localização:", error);
        setLocationLoaded(true); // Indica que a localização foi carregada (mesmo que não tenha sido bem-sucedida)
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      }
    );
  }

  useEffect(() => {
    getMyLocation();
  }, [region]);

  useEffect(() => {
    if (region) {
      getEquipamentos();
    }

  }, [locationLoaded, filterText, region]);


  useEffect(() => {
    setMarkers([]);
  }, [filterText]);

  const showPopUp = (id: string, name: string) => {
    Alert.alert(
      `Equipamento: ${name}`,
      'O que deseja fazer?',
      [
        {
          text: 'Editar',
          onPress: () => navigation.navigate("Atualizar Equipamento", { id }),
          style: 'cancel',
        },
        { text: 'Visualizar', onPress: () => navigation.navigate("Detalhes Equipamento", { id }) },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar equipamentos"
        placeholderTextColor="black"
        value={filterText}
        onChangeText={(text) => setFilterText(text)}
      />
      <View style={{ flex: 1, marginLeft: 25, width: "100%", height: height }}>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          // minZoomLevel={17}
          loadingEnabled={true}
          //onPress={(e) => newMarker(e)}
          region={region}
          initialRegion={region}
        >

          {markers.map((marker) => (
            <Marker
              key={marker.key}
              coordinate={marker.coords}
              pinColor={marker.pinColor}
              onPress={() => showPopUp(marker.id, marker.name)}
            />
          ))}

          {profile !== 'admin' && locationLoaded && (
            <Circle
              center={{
                latitude: region?.latitude || 0,
                longitude: region?.longitude || 0,
              }}
              radius={circleRadius}
              strokeWidth={1}
              strokeColor="rgba(0, 0, 255, 0.5)"
              fillColor="rgba(0, 0, 255, 0.1)"
            />
          )}


        </MapView>
      </View>
    </>

  );
};


const styles = StyleSheet.create({
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  }
});