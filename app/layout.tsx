import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import ThemeRegistry from './themeRegistry';

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'BabySteps',
	description:
		"The complete solution for tracking your baby's growth, health, and daily activities",
	metadataBase: new URL('https://baby-steps-client.vercel.app'),
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${montserrat.variable} antialiased`}>
				<ThemeRegistry>{children}</ThemeRegistry>
			</body>
		</html>
	);
}
