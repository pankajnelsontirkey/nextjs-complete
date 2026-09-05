'use client';

export default function FilterErrorPage({ error }) {
  return (
    <div id='error'>
      <h2>An error occurred!</h2>
      <p>{error?.message ?? 'Invalid path.'}</p>
    </div>
  );
}
