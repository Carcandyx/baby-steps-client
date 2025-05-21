'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Box, Typography, CircularProgress, Grid, Alert } from '@mui/material';
import { layout } from '@/app/styles';
import { authService } from '@/app/services/api/authService';
import NavBar from '@/app/components/appNavBar';
import BabyCard, { Baby } from '@/app/components/babyCard';
import AddBabyCard from '@/app/components/addBabyCard';
import DeleteBabyModal from '@/app/components/deleteBabyModal';
import { babyService } from '@/app/services/api/babyService';

export default function BabiesPage() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [user] = useState(authService.getCurrentUser());
	const [babies, setBabies] = useState<Baby[]>([]);
	const hasFetchedRef = useRef(false);

	// Delete baby state
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [babyToDelete, setBabyToDelete] = useState<Baby | null>(null);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const babiesData = await babyService.getBabies();
			setBabies(babiesData);
		} catch (error) {
			console.error('Error loading babies:', error);
			setError('No pudimos cargar tus bebés. Por favor intenta de nuevo.');
			setBabies([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (hasFetchedRef.current) return;
		fetchData();
		hasFetchedRef.current = true;
	}, [fetchData]);

	// Get user initials for the avatar
	const getInitials = () => {
		if (!user) return 'XX';
		return `${user.firstName?.charAt(0) || ''}${
			user.lastName?.charAt(0) || ''
		}`;
	};

	// Handle opening delete modal
	const handleOpenDeleteModal = (baby: Baby) => {
		setBabyToDelete(baby);
		setDeleteModalOpen(true);
	};

	// Handle closing delete modal
	const handleCloseDeleteModal = () => {
		setDeleteModalOpen(false);
		setBabyToDelete(null);
	};

	// Handle delete baby
	const handleDeleteBaby = async () => {
		if (!babyToDelete?._id) return;

		try {
			setIsDeleting(true);
			await babyService.deleteBaby(babyToDelete._id);

			// Refetch babies list
			await fetchData();

			// Close the modal
			handleCloseDeleteModal();
		} catch (error) {
			console.error('Error deleting baby:', error);
			// You could add a toast notification here
		} finally {
			setIsDeleting(false);
		}
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
						{' '}
						Mis Bebés ({babies.length}){' '}
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
						<Grid size={{ xs: 12, sm: 6, md: 4 }} key={`baby-${baby._id}`}>
							<BabyCard baby={baby} onDelete={handleOpenDeleteModal} />
						</Grid>
					))}

					{/* Add New Baby Card */}
					<Grid size={{ xs: 12, sm: 6, md: 4 }}>
						<AddBabyCard refetchBabies={fetchData} />
					</Grid>
				</Grid>

				{/* Delete Confirmation Modal */}
				{babyToDelete && (
					<DeleteBabyModal
						open={deleteModalOpen}
						onClose={handleCloseDeleteModal}
						onConfirm={handleDeleteBaby}
						babyName={babyToDelete.name || 'este bebé'}
						isDeleting={isDeleting}
					/>
				)}
			</Box>
		</Box>
	);
}
