interface HeadingProps {
  children?: React.ReactNode;
  id?: string;
}

export const MarkdownH3 = ({
  children,
  id,
  ...props
}: HeadingProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      id={id}
      className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 mt-6"
      {...props}>
      {children}
    </h3>
  );
};
