import React from 'react';

export const metadata = {
  title: 'Dhaka Sells BD',
  description: 'E-commerce store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
