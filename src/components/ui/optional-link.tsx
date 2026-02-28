import Link from 'next/link';
import React from 'react';

type OptionalLinkProps = React.PropsWithChildren<{
  href?: string;
  className?: string;
}>;

export default function OptionalLink({
  href,
  className,
  children,
}: OptionalLinkProps) {
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return <span className={className}>{children}</span>;
}
