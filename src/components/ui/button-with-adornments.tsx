'use client';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import styled from 'styled-components';

import { cn } from '../../lib/utils';

import { buttonVariants, type ButtonProps as BaseButtonProps } from './button';

export interface ButtonWithAdornmentsProps
  extends Omit<BaseButtonProps, 'asChild' | 'className'> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const Inner = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;

const AdornmentSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWithAdornments = React.forwardRef<
  HTMLButtonElement,
  ButtonWithAdornmentsProps
>(
  (
    { leading, trailing, variant, size, asChild = false, className, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    // reuse existing class generator
    const classes = cn(buttonVariants({ variant, size }));

    return (
      <Comp ref={ref} className={cn(classes, className)} {...props}>
        <Inner>
          {leading ? <AdornmentSlot>{leading}</AdornmentSlot> : null}
          <span style={{ flex: 1 }}>
            {/* children will be whatever the button label is */}
            {props.children}
          </span>
          {trailing ? <AdornmentSlot>{trailing}</AdornmentSlot> : null}
        </Inner>
      </Comp>
    );
  },
);

ButtonWithAdornments.displayName = 'ButtonWithAdornments';

export { ButtonWithAdornments };
