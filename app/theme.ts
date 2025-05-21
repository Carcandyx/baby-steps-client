'use client';

import { createTheme } from '@mui/material/styles';

// Create a custom theme based on BabySteps design
const theme = createTheme({
	palette: {
		primary: {
			main: '#A095FF', // Primary purple for buttons, links, etc.
			light: '#E8E7FF', // Light purple for backgrounds
			dark: '#7B74BC', // Darker shade for hover states
			contrastText: '#000000',
		},
		secondary: {
			main: '#F8A4BB', // Pink accent color
			light: '#FFD9E3',
			dark: '#E06E8C',
			contrastText: '#FFFFFF',
		},
		background: {
			default: '#FFFFFF',
			paper: '#FAF8E9', // Cream/beige for card backgrounds
		},
		info: {
			main: '#A7E2FF', // Light blue used for baby cards
			light: '#D3F1FF',
			dark: '#75AFCC',
		},
		success: {
			main: '#97D5AA', // Green for successful actions/growth metrics
			light: '#C5EFCF',
			dark: '#5F9B6F',
		},
		warning: {
			main: '#FFC785', // Orange/amber for sleep metrics
			light: '#FFE4BE',
			dark: '#D19D56',
		},
		error: {
			main: '#FF8A8A',
			light: '#FFBEBE',
			dark: '#D15656',
		},
		text: {
			primary: '#333333',
			secondary: '#666666',
		},
	},
	typography: {
		fontFamily: 'var(--font-geist-sans), sans-serif',
		h1: {
			fontSize: '2rem',
			fontWeight: 600,
		},
		h2: {
			fontSize: '1.75rem',
			fontWeight: 600,
		},
		h3: {
			fontSize: '1.5rem',
			fontWeight: 600,
		},
		h4: {
			fontSize: '1.25rem',
			fontWeight: 600,
		},
		h5: {
			fontSize: '1.125rem',
			fontWeight: 600,
		},
		h6: {
			fontSize: '1rem',
			fontWeight: 600,
		},
		button: {
			textTransform: 'none', // Prevents automatic uppercase text
			fontWeight: 500,
		},
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 24, // Rounded buttons
					padding: '8px 16px',
				},
				contained: {
					boxShadow: 'none',
					'&:hover': {
						boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 16,
					boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						borderRadius: 8,
						backgroundColor: 'rgba(255, 255, 255, 0.8)',
					},
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					backgroundColor: '#F8A4BB', // Default pink background
					color: '#FFFFFF',
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#E8E7FF',
					color: '#333333',
					boxShadow: 'none',
				},
			},
		},
	},
});

export default theme;
