import { useState, useEffect } from 'react';
import MarkdownRenderer from "./InfoPanel/MarkdownRenderer";

export default function About() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdownFile = async () => {
      try {
        // Fetch from public directory
        const response = await fetch('/aboutpage.md');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fileContent = await response.text();
        setContent(fileContent);
        setError(null);
      } catch (err) {
        console.error('Error reading aboutpage.md:', err);
        setError('Failed to load about page content');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdownFile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='bg-neutral-800'>
    <div className='max-w-7xl m-auto'>
      <MarkdownRenderer content={content} />
    </div>

    </div>
  );
}