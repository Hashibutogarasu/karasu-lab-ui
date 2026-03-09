'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '../../lib/utils';

/**
 * Typed wrapper around Radix UI Slot that accepts standard button HTML attributes.
 */
const ButtonSlot = Slot as React.ForwardRefExoticComponent<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.RefAttributes<HTMLButtonElement>
>;

/**
 * Class variance authority configuration for button styling variants.
 * Provides variant and size options for consistent button appearance.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

/**
 * Props interface for the Button component.
 * Extends native HTML button attributes with variant and asChild support.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** When true, renders as a child component using Radix UI Slot */
  asChild?: boolean;
  /** When true, disables the button and applies a loading animation */
  loading?: boolean;
  /** Array of step label strings for animated step-based text display */
  steps?: string[];
  /** Current step index (0-indexed) controlling which step label is shown */
  currentStep?: number;
}

/**
 * A polymorphic button component with configurable visual variants and sizes.
 * Supports framer-motion animations when loading or steps props are provided.
 * When asChild is true, renders as a Radix UI Slot without animations.
 *
 * @param className - Additional CSS class names
 * @param variant - Visual style variant of the button
 * @param size - Size variant of the button
 * @param asChild - When true, merges props onto the child element instead of rendering a button
 * @param loading - When true, disables the button and shows a loading state animation
 * @param steps - Array of step label strings for animated step-based text display
 * @param currentStep - Current step index for controlling which step label is shown
 * @param ref - Forwarded ref to the underlying button element
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      steps,
      currentStep = 0,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    if (asChild) {
      return (
        <ButtonSlot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled || loading}
          {...props}>
          {children}
        </ButtonSlot>
      );
    }

    const stepText = steps && steps.length > 0 ? steps[currentStep] : undefined;
    const displayContent = stepText !== undefined ? stepText : children;
    const useAnimation = loading || (steps && steps.length > 0);

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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
        transition={useAnimation ? { duration: 0.2 } : { duration: 0 }}
        {...motionSafeProps}>
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
      </motion.button>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
