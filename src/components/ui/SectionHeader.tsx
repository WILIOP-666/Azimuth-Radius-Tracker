import React from 'react';
import { View } from 'react-native';
import { AppText } from './AppText';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, rightElement, className = '' }: SectionHeaderProps) {
  return (
    <View className={`flex-row justify-between items-center mb-3 ${className}`}>
      <View>
        <AppText variant="h3" weight="bold">{title}</AppText>
        {subtitle && (
          <AppText variant="caption" className="mt-0.5">
            {subtitle}
          </AppText>
        )}
      </View>
      {rightElement && (
        <View>
          {rightElement}
        </View>
      )}
    </View>
  );
}
