import React from 'react';
import { View } from 'react-native';
import { Compass } from 'lucide-react-native';
import { AppText, AppCard } from '../ui';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useAppStore } from '../../store';

export function AzimuthGauge() {
  const telemetry = useAppStore(state => state.telemetry);
  const azimuth = telemetry?.azimuth ?? 0;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withSpring(`${azimuth}deg`, { damping: 20, stiffness: 90 }) }]
    };
  });

  return (
    <AppCard className="items-center py-6">
      <AppText variant="label" className="mb-4">Azimuth Indicator</AppText>

      <View className="relative w-32 h-32 items-center justify-center bg-slate-900 rounded-full border-4 border-slate-800">
        {/* N E S W Markers */}
        <AppText className="absolute top-1 text-[10px] text-slate-500 font-bold">N</AppText>
        <AppText className="absolute bottom-1 text-[10px] text-slate-500 font-bold">S</AppText>
        <AppText className="absolute right-2 text-[10px] text-slate-500 font-bold">E</AppText>
        <AppText className="absolute left-2 text-[10px] text-slate-500 font-bold">W</AppText>

        <Animated.View style={[animatedStyle, { position: 'absolute', zIndex: 10 }]}>
          <Compass size={64} color="#38BDF8" strokeWidth={1.5} />
        </Animated.View>

        <View className="absolute z-20 w-3 h-3 bg-slate-900 rounded-full border-2 border-accent" />
      </View>

      <View className="mt-4 flex-row items-baseline">
        <AppText variant="h1" weight="bold" color="accent">
          {azimuth}°
        </AppText>
      </View>
    </AppCard>
  );
}
