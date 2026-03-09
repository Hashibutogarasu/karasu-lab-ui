'use client';

import { Slot } from '@radix-ui/react-slot';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import styled from 'styled-components';

import { cn } from '../../lib/utils';

import { buttonVariants, type ButtonProps as BaseButtonProps } from './button';

/**
 * Props interface for the ButtonWithAdornments component.
 * Extends ButtonProps with optional leading/trailing slot content and loading state.
 */
export interface ButtonWithAdornmentsProps
  extends Omit<BaseButtonProps, 'asChild' | 'className'> {
  /** Content to display before the button label */
  leading?: React.ReactNode;
  /** Content to display after the button label. Hidden when loading is true. */
  trailing?: React.ReactNode;
  /** When true, renders as a child component using Radix UI Slot */
  asChild?: boolean;
  /** Additional CSS class names */
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

/**
 * A button component that supports leading and trailing adornment slots.
 * Supports animated step-based text display and loading state.
 * When loading is true, the trailing slot is hidden automatically.
 *
 * @param leading - Content to display before the button label
 * @param trailing - Content to display after the button label (hidden when loading)
 * @param variant - Visual style variant of the button
 * @param size - Size variant of the button
 * @param asChild - When true, renders using Radix UI Slot
 * @param loading - When true, disables the button and shows loading animation
 * @param steps - Array of step label strings for animated step-based text
 * @param currentStep - Current step index for controlling which step label is shown
 * @param className - Additional CSS class names
 */
const ButtonWithAdornments = React.forwardRef<
  HTMLButtonElement,
  ButtonWithAdornmentsProps
>(
  (
    {
      leading,
      trailing,
      variant,
      size,
      asChild = false,
      className,
      loading = false,
      steps,
      currentStep = 0,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const classes = cn(buttonVariants({ variant, size }));

    const stepText = steps && steps.length > 0 ? steps[currentStep] : undefined;
    const displayContent = stepText !== undefined ? stepText : children;
    const useAnimation = loading || (steps && steps.length > 0);
    const showTrailing = !loading && trailing;

    const innerContent = (
      <Inner>
        {leading ? <AdornmentSlot>{leading}</AdornmentSlot> : null}
        <span style={{ flex: 1 }}>
          {stepText !== undefined ? (
            <span
              style={{
                overflow: 'hidden',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={loading ? `step-${currentStep}` : 'default'}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  style={{ display: 'inline-block' }}
                  transition={{ duration: 0.15 }}>
                  {displayContent}
                </motion.span>
              </AnimatePresence>
            </span>
          ) : (
            children
          )}
        </span>
        {showTrailing ? <AdornmentSlot>{trailing}</AdornmentSlot> : null}
      </Inner>
    );

    if (!asChild) {
      const {
        onDrag: _onDrag,
        onDragStart: _onDragStart,
        onDragEnd: _onDragEnd,
        onDragOver: _onDragOver,
        onDragEnter: _onDragEnter,
        onDragLeave: _onDragLeave,
        onDrop: _onDrop,
        onAnimationStart: _onAnimationStart,
        onAnimationEnd: _onAnimationEnd,
        onAnimationIteration: _onAnimationIteration,
        ...motionSafeProps
      } = props;
      return (
        <motion.button
          ref={ref}
          className={cn(classes, className)}
          disabled={disabled || loading}
          animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
          transition={useAnimation ? { duration: 0.2 } : { duration: 0 }}
          {...motionSafeProps}>
          {innerContent}
        </motion.button>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(classes, className)}
        disabled={disabled || loading}
        {...props}>
        {innerContent}
      </Comp>
    );
  },
);

ButtonWithAdornments.displayName = 'ButtonWithAdornments';

export { ButtonWithAdornments };
