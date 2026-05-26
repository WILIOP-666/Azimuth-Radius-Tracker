import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, Circle, Polyline, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import { useAppStore } from '../../store';
import { AppCard } from '../ui';

// Simple calculation to get endpoint of azimuth line
const getAzimuthEndpoint = (lat: number, lng: number, azimuth: number, distanceKm: number = 0.5) => {
  const R = 6378.1; // Radius of the Earth in km
  const brng = azimuth * (Math.PI / 180); // Convert degrees to radians
  const lat1 = lat * (Math.PI / 180);
  const lon1 = lng * (Math.PI / 180);

  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(distanceKm / R) + Math.cos(lat1) * Math.sin(distanceKm / R) * Math.cos(brng));
  const lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(distanceKm / R) * Math.cos(lat1), Math.cos(distanceKm / R) - Math.sin(lat1) * Math.sin(lat2));

  return {
    latitude: lat2 * (180 / Math.PI),
    longitude: lon2 * (180 / Math.PI),
  };
};

// Map style for dark theme
const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] },
];

export function LiveMap() {
  const telemetry = useAppStore(state => state.telemetry);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (telemetry && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: telemetry.latitude,
          longitude: telemetry.longitude,
        },
        heading: 0,
        pitch: 0,
        altitude: 2000,
      }, { duration: 1000 });
    }
  }, [telemetry?.latitude, telemetry?.longitude]);

  if (!telemetry) {
    return (
      <AppCard className="flex-1 items-center justify-center bg-slate-900 border-0">
        <View className="h-full w-full bg-slate-800 animate-pulse rounded-xl" />
      </AppCard>
    );
  }

  const azimuthEnd = getAzimuthEndpoint(telemetry.latitude, telemetry.longitude, telemetry.azimuth);

  return (
    <View className="flex-1 overflow-hidden rounded-2xl border border-slate-700">
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: telemetry.latitude,
          longitude: telemetry.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        pitchEnabled={false}
        rotateEnabled={false}
      >
        {/* Radius Overlay */}
        <Circle
          center={{ latitude: telemetry.latitude, longitude: telemetry.longitude }}
          radius={telemetry.radius}
          fillColor="rgba(56, 189, 248, 0.15)"
          strokeColor="rgba(56, 189, 248, 0.5)"
          strokeWidth={1}
        />

        {/* Azimuth Line */}
        <Polyline
          coordinates={[
            { latitude: telemetry.latitude, longitude: telemetry.longitude },
            azimuthEnd
          ]}
          strokeColor="#38BDF8"
          strokeWidth={2}
          lineDashPattern={[5, 5]}
        />

        {/* Current Position Marker */}
        <Marker
          coordinate={{ latitude: telemetry.latitude, longitude: telemetry.longitude }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View className="w-6 h-6 bg-accent rounded-full border-4 border-slate-900 shadow-lg items-center justify-center">
            <View className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
          </View>
        </Marker>
      </MapView>
    </View>
  );
}
