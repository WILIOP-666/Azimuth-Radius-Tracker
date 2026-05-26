import React from 'react';
import { View } from 'react-native';
import { AppText } from './AppText';

interface MetricTileProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function MetricTile({ label, value, unit, icon, className = '' }: MetricTileProps) {
  return (
    <View className={`bg-slate-800/80 p-3 rounded-xl border border-slate-700/50 flex-1 ${className}`}>
      <View className="flex-row items-center justify-between mb-1">
        <AppText variant="label">{label}</AppText>
        {icon}
      </View>
      <View className="flex-row items-baseline mt-1">
        <AppText variant="h2" weight="bold">{value}</AppText>
        {unit && (
          <AppText variant="caption" className="ml-1 opacity-70">
            {unit}
          </AppText>
        )}
      </View>
    </View>
  );
}
