import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { MarkdownH1 } from './markdown/h1';
import { MarkdownH2 } from './markdown/h2';
import { MarkdownH3 } from './markdown/h3';
import { MarkdownH4 } from './markdown/h4';
import { MarkdownLink } from './markdown/link';

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: MarkdownH1,
        h2: MarkdownH2,
        h3: MarkdownH3,
        h4: MarkdownH4,
        a: MarkdownLink,
      }}
      remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  );
}
