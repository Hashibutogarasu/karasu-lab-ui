interface HeadingProps {
  children?: React.ReactNode;
  id?: string;
}

export const MarkdownH1 = ({
  children,
  id,
  ...props
}: HeadingProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      id={id}
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 mt-8 first:mt-0"
      {...props}>
      {children}
    </h1>
  );
};
