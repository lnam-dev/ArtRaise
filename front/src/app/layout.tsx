// app/layout.tsx
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { StoreProvider } from '~/store/client/StoreProvider';
import { Header } from '~/ui/components/layout/header/header';
import { Footer } from '~/ui/components/layout/footer/footer';
import '~/styles/tailwind.css';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return [{ locale: 'ua' }, { locale: 'en' }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body data-theme='light'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
