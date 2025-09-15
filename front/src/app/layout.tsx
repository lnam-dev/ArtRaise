import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { Header } from "~/ui/components/layout/header/header";
import { Footer } from "~/ui/components/layout/footer/footer";
import { StoreProvider } from "~/store/client/StoreProvider";
import { NextIntlClientProvider } from "next-intl";
import { ModalProvider } from "~/ui/components/modal/modal-provider";
import "~/styles/tailwind.css";

export default async function RootLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: { locale: string };
}): Promise<ReactNode> {
	const { locale } = params;
	let messages;

	try {
		messages = await getMessages({ locale });
	} catch (error) {
		notFound();
	}

	return (
		<html lang={locale} className="scrollbar">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<meta name="theme-color" content="#ffffff" />
			</head>
			<body data-theme="light">
				<NextIntlClientProvider locale={locale} messages={messages}>
					<StoreProvider>
						<ModalProvider>
							<Header />
							{children}
							<Footer />
						</ModalProvider>
					</StoreProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
