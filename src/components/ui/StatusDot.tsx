import React from 'react';
import { View } from 'react-native';

interface StatusDotProps {
  status: 'online' | 'offline' | 'connecting';
  size?: number;
}

export function StatusDot({ status, size = 10 }: StatusDotProps) {
  let colorClass = '';

  switch (status) {
    case 'online':
      colorClass = 'bg-success shadow-success/50';
      break;
    case 'connecting':
      colorClass = 'bg-warning shadow-warning/50';
      break;
    case 'offline':
    default:
      colorClass = 'bg-danger shadow-danger/50';
      break;
  }

  return (
    <View
      className={`rounded-full shadow-sm ${colorClass}`}
      style={{ width: size, height: size }}
    />
  );
}
