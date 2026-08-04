import Link from 'next/link';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <footer>
        <p>
          <Link href="/">← Home</Link>
        </p>
      </footer>
    </>
  );
}
