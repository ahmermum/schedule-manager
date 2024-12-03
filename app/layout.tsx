import React from 'react';
import './globals.css';

export const metadata = {
  title: 'School Schedule Manager',
  description: 'Weekly class schedule management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <nav className="container mx-auto px-4 py-3">
            <h1 className="text-xl font-bold text-gray-800">School Schedule Manager</h1>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-white border-t mt-auto">
          <div className="container mx-auto px-4 py-4 text-center text-gray-600">
            © {new Date().getFullYear()} School Schedule Manager
          </div>
        </footer>
      </body>
    </html>
  );
}
