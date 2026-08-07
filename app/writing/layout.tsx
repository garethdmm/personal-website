import Link from 'next/link';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <footer className="max-w-[34em] mx-auto px-6 pt-8 pb-20">
        <Link href="/">← Home</Link>
      </footer>
    </>
  );
}
