interface HeadingProps {
  children?: React.ReactNode;
  id?: string;
}

export const MarkdownH2 = ({
  children,
  id,
  ...props
}: HeadingProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      id={id}
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-4 mt-8 first:mt-0"
      {...props}>
      {children}
    </h2>
  );
};
