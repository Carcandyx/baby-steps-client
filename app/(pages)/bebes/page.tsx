'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid, Alert } from '@mui/material';
import { layout } from '@/app/styles';
import { authService } from '@/app/services/api/authService';
import { useRouter } from 'next/navigation';
import NavBar from '@/app/components/appNavBar';
import BabyCard, { Baby } from '@/app/components/babyCard';
import { babyService } from '@/app/services/api/babyService';

export default function BabiesPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [user, setUser] = useState(authService.getCurrentUser());
	const [babies, setBabies] = useState<Baby[]>([]);

	useEffect(() => {
		// Check authentication and fetch data
		async function fetchData() {
			try {
				setLoading(true);
				setError(null);

				// Simple authentication check using localStorage
				if (!authService.isAuthenticated()) {
					router.push('/login');
					return;
				}

				// Set the user data from local storage
				setUser(authService.getCurrentUser());

				// Fetch babies from API
				const babiesData = await babyService.getBabies();
				setBabies(babiesData);
			} catch (error) {
				console.error('Error loading babies:', error);
				setError('No pudimos cargar tus bebés. Por favor intenta de nuevo.');
				setBabies([]);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [router]);

	// Get user initials for the avatar
	const getInitials = () => {
		if (!user) return 'JS';
		return `${user.firstName?.charAt(0) || ''}${
			user.lastName?.charAt(0) || ''
		}`;
	};

	// Loading state
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
			<NavBar userInitials={getInitials()} />
			<Box sx={{ ...layout.container, py: 4 }}>
				{/* Header */}
				<Box sx={{ mb: 3 }}>
					<Typography
						variant='h4'
						component='h1'
						fontWeight='bold'
						sx={{ mb: 1 }}
					>
						Mis Bebés
					</Typography>
					<Typography variant='body1' color='text.secondary'>
						Administra los perfiles de tus pequeños y mantén un seguimiento de
						su desarrollo
					</Typography>
				</Box>

				{/* Error message if API call failed */}
				{error && (
					<Alert severity='error' sx={{ mb: 3 }}>
						{error}
					</Alert>
				)}

				{/* Baby Cards Grid */}
				<Grid container spacing={3}>
					{/* Baby Cards */}
					{babies.map((baby) => (
						<Grid size={{ xs: 12, sm: 6, md: 4 }} key={`baby-${baby.id}`}>
							<BabyCard baby={baby} />
						</Grid>
					))}

					{/* Add New Baby Card */}
					<Grid size={{ xs: 12, sm: 6, md: 4 }}>
						<BabyCard isAddCard />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
