import React from 'react';
import { View, ViewProps } from 'react-native';

interface AppCardProps extends ViewProps {
  noPadding?: boolean;
}

export function AppCard({ children, noPadding = false, className = '', ...props }: AppCardProps) {
  return (
    <View
      className={`bg-card rounded-2xl border border-slate-700/50 shadow-sm ${noPadding ? '' : 'p-4'} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
