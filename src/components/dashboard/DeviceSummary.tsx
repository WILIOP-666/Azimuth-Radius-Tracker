import React from 'react';
import { View } from 'react-native';
import { Cpu, Server } from 'lucide-react-native';
import { AppCard, AppText } from '../ui';
import { useAppStore } from '../../store';

export function DeviceSummary() {
  const telemetry = useAppStore(state => state.telemetry);

  if (!telemetry) return null;

  return (
    <AppCard className="mb-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Cpu size={20} color="#38BDF8" />
          <AppText variant="h3" weight="bold">Device: {telemetry.device_id}</AppText>
        </View>
        <View className="bg-slate-700/50 px-2 py-1 rounded-md border border-slate-600/50">
          <AppText variant="caption">{telemetry.operator}</AppText>
        </View>
      </View>

      <View className="bg-slate-900 rounded-lg p-3 flex-row items-center gap-3">
        <Server size={16} color="#64748B" />
        <AppText variant="caption" className="flex-1 font-mono">
          Lat: {telemetry.latitude.toFixed(6)}
        </AppText>
        <AppText variant="caption" className="flex-1 font-mono text-right">
          Lng: {telemetry.longitude.toFixed(6)}
        </AppText>
      </View>
    </AppCard>
  );
}
