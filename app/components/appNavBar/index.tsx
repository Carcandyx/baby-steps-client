'use client';

import * as React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	Avatar,
	useTheme,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavBarProps {
	userInitials?: string;
}

export default function NavBar({ userInitials = 'JS' }: NavBarProps) {
	const theme = useTheme();
	const pathname = usePathname();

	// Helper to determine if a link is active
	const isActive = (path: string) => {
		return pathname === path || pathname?.startsWith(`${path}/`);
	};

	return (
		<AppBar
			position='static'
			sx={{
				backgroundColor: theme.palette.primary.light,
				boxShadow: 'none',
				color: theme.palette.text.primary,
				padding: '0.5rem 1rem',
			}}
		>
			<Toolbar sx={{ justifyContent: 'space-between', padding: { xs: 0 } }}>
				{/* Logo */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						marginRight: { xs: 1, md: 4 },
					}}
					component={Link}
					href='/dashboard'
				>
					<Typography
						variant='h6'
						component='div'
						sx={{
							fontWeight: 'bold',
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							textDecoration: 'none',
							color: 'inherit',
						}}
					>
						<Avatar
							sx={{
								backgroundColor: 'white',
								color: theme.palette.primary.light,
								width: 28,
								height: 28,
								marginRight: '4px',
								fontSize: '1rem',
							}}
						>
							👶
						</Avatar>
						BabySteps
					</Typography>
				</Box>

				{/* Navigation Links */}
				<Box
					sx={{
						display: 'flex',
						flexGrow: 1,
						justifyContent: { xs: 'space-between', md: 'center' },
						gap: { xs: 0, md: 4 },
					}}
				>
					<Button
						component={Link}
						href='/dashboard'
						sx={{
							color: isActive('/dashboard')
								? theme.palette.primary.dark
								: 'inherit',
							fontWeight: isActive('/dashboard') ? 'bold' : 'medium',
							'&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
						}}
					>
						Resumen
					</Button>
					<Button
						component={Link}
						href='/bebes'
						sx={{
							color: isActive('/bebes')
								? theme.palette.primary.dark
								: 'inherit',
							fontWeight: isActive('/bebes') ? 'bold' : 'medium',
							'&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
						}}
					>
						Bebés
					</Button>
					<Button
						component={Link}
						href='/calendario'
						sx={{
							color: isActive('/calendario')
								? theme.palette.primary.dark
								: 'inherit',
							fontWeight: isActive('/calendario') ? 'bold' : 'medium',
							'&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
						}}
					>
						Calendario
					</Button>
					<Button
						component={Link}
						href='/informes'
						sx={{
							color: isActive('/informes')
								? theme.palette.primary.dark
								: 'inherit',
							fontWeight: isActive('/informes') ? 'bold' : 'medium',
							'&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
						}}
					>
						Informes
					</Button>
				</Box>

				{/* User Profile */}
				<Avatar
					sx={{
						bgcolor: theme.palette.secondary.main,
						color: theme.palette.secondary.contrastText,
						cursor: 'pointer',
						marginLeft: { xs: 1, md: 4 },
					}}
				>
					{userInitials}
				</Avatar>
			</Toolbar>
		</AppBar>
	);
}
