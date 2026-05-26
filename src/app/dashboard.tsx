import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings } from 'lucide-react-native';
import { router } from 'expo-router';

import { AppText, AppButton } from '../components/ui';
import {
  LiveMap,
  ConnectionCard,
  DeviceSummary,
  TelemetryCard,
  AzimuthGauge
} from '../components/dashboard';

import { useAppStore } from '../store';
import { telemetryService } from '../services/mockTelemetry';

export default function DashboardScreen() {
  const { updateTelemetry, setConnectionStatus } = useAppStore();

  useEffect(() => {
    telemetryService.connect(
      (data) => updateTelemetry(data),
      (status) => setConnectionStatus(status)
    );

    return () => {
      telemetryService.disconnect();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-card border-b border-slate-800">
        <View>
          <AppText variant="h2" weight="bold">Dashboard</AppText>
          <AppText variant="caption">Live Tracking</AppText>
        </View>
        <AppButton
          title=""
          variant="outline"
          size="sm"
          className="px-3 border-slate-700"
          onPress={() => router.push('/settings')}
        >
          <Settings size={20} color="#F8FAFC" />
        </AppButton>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        {/* Connection Status */}
        <View className="mb-4">
          <ConnectionCard />
        </View>

        {/* Map Area */}
        <View className="h-64 mb-4">
          <LiveMap />
        </View>

        {/* Device Summary */}
        <DeviceSummary />

        {/* Gauges & Telemetry */}
        <View className="flex-row gap-4 mb-4">
          <View className="w-1/2">
            <AzimuthGauge />
          </View>
          <View className="w-1/2 flex-1">
            <TelemetryCard />
          </View>
        </View>

        {/* Bottom padding for scroll */}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
