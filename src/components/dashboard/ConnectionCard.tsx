import React from 'react';
import { View } from 'react-native';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react-native';
import { AppCard, AppText, StatusDot } from '../ui';
import { useAppStore } from '../../store';

export function ConnectionCard() {
  const status = useAppStore(state => state.connectionStatus);

  let statusText = '';
  let Icon = WifiOff;
  let iconColor = '#EF4444';

  switch (status) {
    case 'online':
      statusText = 'Connected to Server';
      Icon = Wifi;
      iconColor = '#22C55E';
      break;
    case 'connecting':
      statusText = 'Reconnecting...';
      Icon = RefreshCw;
      iconColor = '#F59E0B';
      break;
    case 'offline':
    default:
      statusText = 'Disconnected';
      Icon = WifiOff;
      iconColor = '#EF4444';
      break;
  }

  return (
    <AppCard className="py-3 px-4 flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <StatusDot status={status} size={12} />
        <View>
          <AppText variant="h3" weight="bold">{statusText}</AppText>
          <AppText variant="caption">WebSocket Link</AppText>
        </View>
      </View>
      <View className="bg-slate-900 p-2 rounded-full">
        <Icon size={20} color={iconColor} />
      </View>
    </AppCard>
  );
}
