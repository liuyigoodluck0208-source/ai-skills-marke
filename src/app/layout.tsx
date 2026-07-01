import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Skills & Agents Market',
  description: 'Discover and install the latest AI skills, agents, and tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-950 text-white antialiased">{children}</body>
    </html>
  );
}
