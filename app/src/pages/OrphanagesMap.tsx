import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import api from '../services/api';
import mapMarker from '../images/map-marker.png';

interface OrphanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanageMap() {
  const navigation = useNavigation();
  
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);

  useFocusEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    });
  });

  function handleNavigateToOrphanageDetail(id: number) {
    navigation.navigate('OrphanageDetail', { id });
  }
  
  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition')
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -23.5501276,
          longitude: -46.6333279,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }} 
      >
        { orphanages.map(orphanage => (
          <Marker 
            key={orphanage.id}
            icon={mapMarker}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}
          >
            <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetail(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        )) }
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton style={styles.createOrphanateButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 169,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: "center",
  },
  calloutText: {
    color: '#17d6eb',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    elevation: 3
  },
  footerText: {
    color: '#6fa7b3',
    fontFamily: 'Nunito_700Bold'
  },
  createOrphanateButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: "center"
  }
});
