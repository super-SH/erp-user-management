import React from 'react';
import { cn } from '@/lib/utils';

export function Heading1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        `text-4xl font-bold leading-[140%] tracking-tighter`,
        className
      )}
    >
      {children}
    </h1>
  );
}

export function Heading2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        `text-3xl font-bold leading-[140%] tracking-tighter`,
        className
      )}
    >
      {children}
    </h2>
  );
}

export function Heading3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        `text-2xl font-bold leading-[140%] tracking-tighter`,
        className
      )}
    >
      {children}
    </h3>
  );
}

export function Paragraph({
  children,
  size,
  weight,
  className = '',
}: {
  children: React.ReactNode;
  size: 'body' | 'base' | 'small' | 'subtle' | 'tiny';
  weight: 'bold' | 'semi' | 'medium' | 'regular';
  className?: string;
}) {
  let fontSize = 'text-[16px]';
  let fontWeight = 'font-normal';

  switch (size) {
    case 'body':
      fontSize = 'text-[18px]';
      break;
    case 'base':
      fontSize = 'text-[16px]';
      break;
    case 'small':
      fontSize = 'text-[14px]';
      break;
    case 'subtle':
      fontSize = 'text-[12px]';
      break;
    case 'tiny':
      fontSize = 'text-[10px]';
      break;
    default:
      fontSize = '';
  }

  switch (weight) {
    case 'bold':
      fontWeight = 'font-bold';
      break;
    case 'semi':
      fontWeight = 'font-semibold';
      break;
    case 'medium':
      fontWeight = 'font-medium';
      break;
    case 'regular':
      fontWeight = 'font-normal';
      break;
    default:
      fontWeight = '';
  }

  return (
    <p className={cn(`leading-[140%] ${fontSize} ${fontWeight}`, className)}>
      {children}
    </p>
  );
}
