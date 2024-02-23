import React from 'react';

export function Heading1({
  children,
  additionalStyles,
}: {
  children: React.ReactNode;
  additionalStyles?: string;
}) {
  return (
    <h1
      className={`text-4xl font-bold leading-[140%] tracking-tighter ${additionalStyles}`}
    >
      {children}
    </h1>
  );
}

export function Heading2({
  children,
  additionalStyles,
}: {
  children: React.ReactNode;
  additionalStyles?: string;
}) {
  return (
    <h2
      className={`text-3xl font-bold leading-[140%] tracking-tighter ${additionalStyles}`}
    >
      {children}
    </h2>
  );
}

export function Heading3({
  children,
  additionalStyles,
}: {
  children: React.ReactNode;
  additionalStyles?: string;
}) {
  return (
    <h3
      className={`text-2xl font-bold leading-[140%] tracking-tighter ${additionalStyles}`}
    >
      {children}
    </h3>
  );
}

export function Paragraph({
  children,
  size,
  weight,
}: {
  children: React.ReactNode;
  size: 'body' | 'base' | 'small' | 'subtle' | 'tiny';
  weight: 'bold' | 'semi' | 'medium' | 'regular';
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
    <p className={`leading-[140%] ${fontSize} ${fontWeight}`}>{children}</p>
  );
}
