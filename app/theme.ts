'use client';

import { createTheme } from '@mui/material/styles';

// Create a custom theme based on BabySteps design
const theme = createTheme({
	palette: {
		primary: {
			main: '#A095FF', // Primary purple for buttons, links, etc.
			light: '#E8E7FF', // Light purple for backgrounds
			dark: '#7B74BC', // Darker shade for hover states
			contrastText: '#FFFFFF', // Changed to white for better contrast
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
		fontFamily: 'var(--font-montserrat), sans-serif',
		h1: {
			fontSize: '2.5rem',
			fontWeight: 700,
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 600,
		},
		h3: {
			fontSize: '1.75rem',
			fontWeight: 600,
		},
		h4: {
			fontSize: '1.5rem',
			fontWeight: 600,
			marginBottom: '0.5rem',
		},
		h5: {
			fontSize: '1.25rem',
			fontWeight: 600,
		},
		h6: {
			fontSize: '1.1rem',
			fontWeight: 600,
		},
		button: {
			textTransform: 'none', // Prevents automatic uppercase text
			fontWeight: 600,
			fontSize: '1rem',
		},
		body1: {
			fontSize: '1rem',
			lineHeight: 1.5,
		},
		body2: {
			fontSize: '0.875rem',
			lineHeight: 1.5,
		},
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 30, // More rounded buttons
					padding: '10px 24px',
					transition: 'all 0.2s ease-in-out',
					fontFamily: 'var(--font-montserrat), sans-serif',
				},
				contained: {
					boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
					'&:hover': {
						boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)',
						transform: 'translateY(-2px)',
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 16,
					boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)',
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					marginBottom: '16px',
					'& .MuiInputLabel-root': {
						fontFamily: 'var(--font-montserrat), sans-serif',
					},
					'& .MuiOutlinedInput-root': {
						borderRadius: 12,
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						transition: 'all 0.2s',
						'&:hover': {
							boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
						},
						'&.Mui-focused': {
							boxShadow: '0px 4px 12px rgba(160, 149, 255, 0.2)',
						},
					},
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					backgroundColor: '#F8A4BB', // Default pink background
					color: '#FFFFFF',
					fontFamily: 'var(--font-montserrat), sans-serif',
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
		MuiTypography: {
			styleOverrides: {
				root: {
					fontFamily: 'var(--font-montserrat), sans-serif',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: `
				html, body {
					font-family: var(--font-montserrat), sans-serif;
				}
			`,
		},
	},
});

export default theme;
