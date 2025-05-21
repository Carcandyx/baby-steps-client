'use client';

import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	Paper,
	Button,
	CircularProgress,
} from '@mui/material';
import { layout, spacing, text } from '@/app/styles';
import { authService } from '@/app/services/api/authService';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(authService.getCurrentUser());

	useEffect(() => {
		// Simple authentication check using localStorage
		if (!authService.isAuthenticated()) {
			router.push('/login');
			return;
		}

		// Set the user data from local storage
		setUser(authService.getCurrentUser());
		setLoading(false);
	}, [router]);

	const handleLogout = () => {
		authService.logout();
		router.push('/login');
	};

	if (loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={layout.page}>
			<Box sx={layout.container}>
				<Paper
					elevation={3}
					sx={{
						padding: spacing.lg,
						borderRadius: '16px',
						marginBottom: spacing.md,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							mb: spacing.md,
						}}
					>
						<Typography variant='h4' component='h1' sx={text.pageTitle}>
							Dashboard de BabySteps
						</Typography>
						<Button variant='outlined' color='primary' onClick={handleLogout}>
							Cerrar sesión
						</Button>
					</Box>

					<Typography variant='h5' gutterBottom>
						¡Bienvenido, {user?.firstName}!
					</Typography>

					<Typography paragraph>
						Esta es tu área personal para monitorear el desarrollo de tu bebé.
						Desde aquí podrás:
					</Typography>

					<ul>
						<Typography component='li' sx={{ mb: 1 }}>
							Registrar alimentaciones, sueño y cambios de pañal
						</Typography>
						<Typography component='li' sx={{ mb: 1 }}>
							Programar y recordar citas médicas
						</Typography>
						<Typography component='li' sx={{ mb: 1 }}>
							Monitorear el crecimiento y desarrollo
						</Typography>
						<Typography component='li' sx={{ mb: 1 }}>
							Compartir información con familiares
						</Typography>
					</ul>
				</Paper>
			</Box>
		</Box>
	);
}
