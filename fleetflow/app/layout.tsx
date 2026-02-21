import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FleetFlow - Fleet & Logistics Management',
  description:
    'A comprehensive fleet and logistics management system for efficient vehicle tracking and operations',
  keywords: ['fleet', 'logistics', 'vehicles', 'tracking', 'management'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 font-sans antialiased">{children}</body>
    </html>
  );
}
