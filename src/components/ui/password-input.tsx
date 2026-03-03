'use client';

import React, { useState, forwardRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useAppTranslate } from '../../hooks/use-app-translate';

import { Button } from './button';
import { Input } from './input';

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const { t } = useAppTranslate();

    return (
      <div className="relative flex">
        <Input
          {...props}
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={(className ? className + ' ' : '') + ' pr-10'}
        />
        <div className="p-1" />

        <Button
          variant="outline"
          type="button"
          aria-label={
            visible
              ? t('forms.passwordInput.hidePassword')
              : t('forms.passwordInput.showPassword')
          }
          onClick={() => setVisible((v) => !v)}>
          {visible ? <FaEyeSlash /> : <FaEye />}
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
export { PasswordInput };
