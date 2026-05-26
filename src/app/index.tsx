import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Crosshair } from 'lucide-react-native';
import { AppText, AppCard, AppButton } from '../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/dashboard');
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-6"
      >
        <View className="items-center mb-10">
          <View className="w-24 h-24 bg-slate-800 rounded-full items-center justify-center mb-6 border-2 border-accent shadow-lg shadow-accent/20">
            <Crosshair size={48} color="#38BDF8" strokeWidth={1.5} />
          </View>
          <AppText variant="h1" weight="bold" className="text-center mb-2">
            Azimuth & Radius
          </AppText>
          <AppText variant="h3" color="secondary" className="text-center">
            Tracker Dashboard
          </AppText>
        </View>

        <AppCard className="p-6">
          <AppText variant="body" color="secondary" className="text-center mb-6">
            Enter device credentials to access live telemetry tracking.
          </AppText>

          <AppButton
            title="Connect Device"
            onPress={handleLogin}
            isLoading={isLoading}
            size="lg"
          />
        </AppCard>

        <View className="mt-8 items-center">
          <AppText variant="caption">v1.0.0-MVP</AppText>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
