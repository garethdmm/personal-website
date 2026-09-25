import type { ReactNode } from 'react';

export default function Blockquote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <blockquote
      cite={cite}
      className="my-7 mx-0 border-l border-[#1a1a1a]/30 pl-[22px] not-italic [&>p:last-child]:mb-0"
    >
      {children}
    </blockquote>
  );
}
