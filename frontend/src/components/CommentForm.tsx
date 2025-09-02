import { useState } from 'react';

interface Props {
  onSubmit: (author: string, content: string) => void;
}

export const  CommentForm = ({ onSubmit }: Props) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;
    onSubmit(author, content);
    setAuthor('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
      />
      <textarea
        placeholder="Your comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
      />
      <button type="submit">Add comment</button>
    </form>
  );
}
