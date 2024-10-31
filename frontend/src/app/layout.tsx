// app/layout.tsx
import '../styles/globals.scss';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="container mx-auto max-w-screen-xl px-4">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
