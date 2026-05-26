import React from 'react';
import { Text, TextProps } from 'react-native';

interface AppTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  weight?: 'normal' | 'medium' | 'bold';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
}

export function AppText({
  children,
  variant = 'body',
  weight = 'normal',
  color = 'primary',
  className = '',
  ...props
}: AppTextProps) {

  let textClass = 'text-text'; // default light text

  // Handle Variants
  switch (variant) {
    case 'h1':
      textClass += ' text-3xl';
      break;
    case 'h2':
      textClass += ' text-2xl';
      break;
    case 'h3':
      textClass += ' text-xl';
      break;
    case 'body':
      textClass += ' text-base';
      break;
    case 'caption':
      textClass += ' text-sm text-slate-400';
      break;
    case 'label':
      textClass += ' text-xs text-slate-400 uppercase tracking-wider';
      break;
  }

  // Handle Weights
  switch (weight) {
    case 'medium':
      textClass += ' font-medium';
      break;
    case 'bold':
      textClass += ' font-bold';
      break;
  }

  // Handle Colors
  switch (color) {
    case 'secondary':
      textClass = textClass.replace('text-text', 'text-slate-400');
      break;
    case 'accent':
      textClass = textClass.replace('text-text', 'text-accent');
      break;
    case 'success':
      textClass = textClass.replace('text-text', 'text-success');
      break;
    case 'warning':
      textClass = textClass.replace('text-text', 'text-warning');
      break;
    case 'danger':
      textClass = textClass.replace('text-text', 'text-danger');
      break;
  }

  return (
    <Text className={`${textClass} ${className}`} {...props}>
      {children}
    </Text>
  );
}
