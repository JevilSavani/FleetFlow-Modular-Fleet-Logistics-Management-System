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
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
