'use client';

import { useEffect, useState } from 'react';

import Markdown from './markdown';
import { Spinner } from './shadcn-io/spinner';

interface StaticMarkdownProps {
  filePath: string;
  className?: string;
}

export default function StaticMarkdown({
  filePath,
  className,
}: StaticMarkdownProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch markdown: ${response.status} ${response.statusText}`,
          );
        }

        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [filePath]);

  return (
    <div className={`max-w-8xl mx-auto ${className ?? ''}`}>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-destructive">エラーが発生しました: {error}</p>
        </div>
      ) : (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <Markdown>{content}</Markdown>
        </div>
      )}
    </div>
  );
}
