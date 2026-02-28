interface HeadingProps {
  children?: React.ReactNode;
  id?: string;
}

export const MarkdownH4 = ({
  children,
  id,
  ...props
}: HeadingProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h4
      id={id}
      className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 mt-4"
      {...props}>
      {children}
    </h4>
  );
};
