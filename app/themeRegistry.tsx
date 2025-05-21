'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

export default function ThemeRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	// Using useState to ensure the client-side only initialization
	const [mounted, setMounted] = useState(false);

	// This will only run once on the client after the component mounts
	// This prevents any hydration issues with server/client differences
	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			{/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon */}
			<CssBaseline />
			{/* Only render children once mounted on client to prevent hydration mismatch */}
			{mounted ? children : null}
		</ThemeProvider>
	);
}
