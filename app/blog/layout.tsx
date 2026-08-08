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
        <hr className="border-0 border-t border-[#1a1a1a]/25 m-0 mb-6" />
        <address className="mb-6">
          Gareth MacLeod ·{' '}
          <a href="mailto:gareth.macleod@gmail.com">gareth.macleod@gmail.com</a>
        </address>
        <Link href="/">← Home</Link>
      </footer>
    </>
  );
}
