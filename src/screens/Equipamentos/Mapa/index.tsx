import React, { useState, useEffect, useContext } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Region } from "react-native-maps";
import { Dimensions, Text, View } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { apiurl } from "../../../Helpers/ApiUrl";
import { GlobalContext } from "../../../Context/GlobalProvider";

const { width, height } = Dimensions.get("window");

interface MarkerData {
  key: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  pinColor: string;
}

export const MapaComponente = () => {
  const context = useContext(GlobalContext);
  const token = context?.token || "";
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [region, setRegion] = useState<Region | undefined>(undefined);

  const newMarker = (e: any) => {
    const newMarkerData: MarkerData = {
      key: String(markers.length+1),
      coords: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
      pinColor: "#FF0000",
    };

    setRegion({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    setMarkers((oldMarkers) => [...oldMarkers, newMarkerData]);
  };
 
  

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
            var n = markers.length
            console.log(n)
           
             data.map((element:any)=> {
              
              if(element.latitude && element.longitude){
                const newMarkerData: MarkerData = {
                  key: (n+1).toString(),
                  coords: {
                    latitude: Number.parseFloat(element.latitude),
                    longitude: Number.parseFloat(element.longitude)
                  },
                  pinColor: "#FF0000",
                };
                console.log(newMarkerData, n++)
                setRegion({
                  latitude: Number.parseFloat(element.latitude),
                    longitude: Number.parseFloat(element.longitude),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
                
            
                setMarkers((oldMarkers) => [...oldMarkers, newMarkerData]);
                
              }
              
             });
          })
          .catch((error) => {
              console.error(error);

          })
          
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

          

      },
      (error) => {
        console.log("Erro ao obter a localização:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      }
    );
  }

  useEffect(() => {
    getMyLocation();
    
  },[region]) ;
  useEffect(()=>{

    getEquipamentos();

  },[])

  return (
    <View style={{ flex: 1, marginLeft: 25, width: "100%", height: height }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
        minZoomLevel={17}
        loadingEnabled={true}
        onPress={(e) => newMarker(e)}
        region={region}
        initialRegion={region}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.key}
            coordinate={marker.coords}
            pinColor={marker.pinColor}
          />
        ))}
      </MapView>
    </View>
  );
};
