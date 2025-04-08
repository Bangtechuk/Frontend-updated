import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'FitTribe.fitness',
  description: 'Connect with certified fitness trainers for personalized virtual and in-person sessions.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
