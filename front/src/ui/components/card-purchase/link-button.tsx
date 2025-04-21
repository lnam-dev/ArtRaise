'use client';
import Button from '../button/button';
import React from 'react';

interface LinkButtonProps
  extends Omit<React.ComponentProps<typeof Button>, 'children'> {
  href?: string;
  children?: React.ReactNode;
}

export default function LinkButton({
  href = '#',
  children,
  ...props
}: LinkButtonProps) {
  // FIXME Раніше тут був path(href), але це може зараз не коректно працювати
  return (
    <Button href={href} {...props}>
      {children}
    </Button>
  );
}
