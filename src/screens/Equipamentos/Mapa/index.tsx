import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Region } from "react-native-maps";
import { Dimensions, Text, View } from "react-native";
import Geolocation from "@react-native-community/geolocation";

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
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [region, setRegion] = useState<Region | undefined>(undefined);

  const newMarker = (e: any) => {
    const newMarkerData: MarkerData = {
      key: String(markers.length),
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

  function getMyLocation() {
    Geolocation.getCurrentPosition(
      (info) => {
        const userRegion: Region = {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          setRegion(userRegion);
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
