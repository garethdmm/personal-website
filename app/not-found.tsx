import Link from 'next/link';

export const metadata = {
  title: 'Page not found — Gareth MacLeod',
};

// GitHub Pages serves this page (exported as 404.html) for every missing URL,
// so it doubles as the redirect for pre-rename /blog/* links.
const legacyBlogRedirect = `
(function () {
  var m = location.pathname.match(/^\\/blog(\\/.+)$/);
  if (m) location.replace('/writing' + m[1] + location.search + location.hash);
})();
`;

export default function NotFound() {
  return (
    <div className="max-w-[34em] mx-auto px-6 pt-20">
      <script dangerouslySetInnerHTML={{ __html: legacyBlogRedirect }} />

      <header className="mb-14">
        <Link href="/" className="caps no-underline text-[0.85rem]">
          Gareth MacLeod
        </Link>
      </header>

      <main>
        <h1 className="mt-0 mb-1 text-[1.45rem] leading-[1.25]">
          Page not found
        </h1>

        <div className="fleuron" aria-hidden="true">&#10086;</div>

        <p>
          There is no page at this address. Perhaps you were looking for
          something on the <Link href="/">home page</Link>.
        </p>
      </main>
    </div>
  );
}
