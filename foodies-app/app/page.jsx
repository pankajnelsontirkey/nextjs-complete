import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>
      <p>
        <Link href='/meals'>Browse Meals</Link>
        &nbsp;
        <Link href='/meals/share'>Share Meal</Link>
      </p>
      <p>
        <Link href='/community'>Join the Community</Link>
      </p>
    </main>
  );
}
