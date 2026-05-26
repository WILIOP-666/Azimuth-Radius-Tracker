import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { AppText } from './AppText';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function AppButton({
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: AppButtonProps) {

  let btnClass = 'rounded-xl flex-row items-center justify-center';
  let textClass = 'text-center font-medium';
  let textColor: any = 'text';

  // Handle Variants
  switch (variant) {
    case 'primary':
      btnClass += ' bg-accent';
      textClass += ' text-slate-900 font-bold';
      textColor = 'primary';
      break;
    case 'secondary':
      btnClass += ' bg-slate-700';
      textClass += ' text-white';
      textColor = 'primary';
      break;
    case 'outline':
      btnClass += ' border border-slate-600 bg-transparent';
      textClass += ' text-white';
      textColor = 'primary';
      break;
    case 'danger':
      btnClass += ' bg-danger/20 border border-danger/50';
      textClass += ' text-danger';
      textColor = 'danger';
      break;
  }

  // Handle Sizes
  switch (size) {
    case 'sm':
      btnClass += ' py-2 px-4';
      textClass += ' text-sm';
      break;
    case 'md':
      btnClass += ' py-3 px-6';
      textClass += ' text-base';
      break;
    case 'lg':
      btnClass += ' py-4 px-8';
      textClass += ' text-lg';
      break;
  }

  if (disabled || isLoading) {
    btnClass += ' opacity-50';
  }

  return (
    <TouchableOpacity
      className={`${btnClass} ${className}`}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#0F172A' : '#F8FAFC'} size="small" />
      ) : (
        <AppText weight="bold" color={textColor} className={textClass}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
}
