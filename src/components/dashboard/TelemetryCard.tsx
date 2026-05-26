import React from 'react';
import { View } from 'react-native';
import { Activity, Gauge, MapPin, Signal, Battery, Radio } from 'lucide-react-native';
import { AppCard, MetricTile, SectionHeader } from '../ui';
import { useAppStore } from '../../store';

export function TelemetryCard() {
  const telemetry = useAppStore(state => state.telemetry);

  if (!telemetry) return null;

  return (
    <AppCard>
      <SectionHeader title="Live Telemetry" subtitle={`Updated: ${new Date(telemetry.timestamp).toLocaleTimeString()}`} />

      <View className="flex-row gap-2 mb-2">
        <MetricTile
          label="Radius"
          value={telemetry.radius}
          unit="m"
          icon={<Radio size={16} color="#38BDF8" />}
        />
        <MetricTile
          label="Speed"
          value={telemetry.speed}
          unit="km/h"
          icon={<Gauge size={16} color="#38BDF8" />}
        />
      </View>

      <View className="flex-row gap-2 mb-2">
        <MetricTile
          label="Altitude"
          value={telemetry.altitude}
          unit="m"
          icon={<Activity size={16} color="#38BDF8" />}
        />
        <MetricTile
          label="Accuracy"
          value={telemetry.accuracy}
          unit="m"
          icon={<MapPin size={16} color="#38BDF8" />}
        />
      </View>

      <View className="flex-row gap-2">
        <MetricTile
          label="Signal"
          value={telemetry.signal_strength}
          unit="dBm"
          icon={<Signal size={16} color={telemetry.signal_strength > -80 ? "#22C55E" : "#F59E0B"} />}
        />
        <MetricTile
          label="Battery"
          value={telemetry.battery}
          unit="%"
          icon={<Battery size={16} color={telemetry.battery > 20 ? "#22C55E" : "#EF4444"} />}
        />
      </View>
    </AppCard>
  );
}
