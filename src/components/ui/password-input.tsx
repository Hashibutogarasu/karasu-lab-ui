import { useTranslate } from '@tolgee/react';
import React, { useState, forwardRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Input } from '@/components/ui/input';

import { Button } from './button';

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const { t } = useTranslate();

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
              ? t('components.forms.passwordInput.hidePassword')
              : t('components.forms.passwordInput.showPassword')
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
