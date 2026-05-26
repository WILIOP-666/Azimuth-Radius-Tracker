import React from 'react';
import { View } from 'react-native';
import { AppText, AppCard, AppButton } from '../components/ui';
import { router } from 'expo-router';

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-background p-6">
      <AppCard className="mb-6">
        <AppText variant="h2" weight="bold" className="mb-4">Settings</AppText>
        <AppText variant="body" color="secondary" className="mb-6">
          Settings configuration will go here in future updates. Includes Map Provider selection, API URL overrides, and tracking intervals.
        </AppText>
      </AppCard>

      <AppButton
        title="Logout"
        variant="danger"
        onPress={() => router.replace('/')}
      />
    </View>
  );
}
