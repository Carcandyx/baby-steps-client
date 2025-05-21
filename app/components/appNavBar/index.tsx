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

interface NavBarProps {
	userInitials?: string;
}

export default function NavBar({ userInitials = 'JS' }: NavBarProps) {
	const theme = useTheme();

	return (
		<AppBar
			position='static'
			sx={{
				backgroundColor: theme.palette.primary.light,
				boxShadow: 'none',
				color: theme.palette.text.primary,
			}}
		>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				{/* Logo */}
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography
						variant='h6'
						component='div'
						sx={{
							fontWeight: 'bold',
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<Avatar
							sx={{
								backgroundColor: 'white',
								color: theme.palette.primary.light,
								width: 24,
								height: 24,
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
						justifyContent: 'center',
						gap: 4,
					}}
				>
					<Button
						component={Link}
						href='/resumen'
						sx={{
							color: 'inherit',
							fontWeight: 'medium',
							'&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
						}}
					>
						Resumen
					</Button>
					<Button
						component={Link}
						href='/bebes'
						sx={{
							color: 'inherit',
							fontWeight: 'medium',
							'&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
						}}
					>
						Bebés
					</Button>
				</Box>

				{/* User Profile */}
				<Avatar
					sx={{
						bgcolor: theme.palette.secondary.main,
						color: theme.palette.secondary.contrastText,
						cursor: 'pointer',
					}}
				>
					{userInitials}
				</Avatar>
			</Toolbar>
		</AppBar>
	);
}
