'use client';

import React, { useState } from 'react';
import { Typography, Card, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddBabyModal, { BabyFormValues } from '../babyModal';
import { babyService, CreateBabyPayload } from '@/app/services/api/babyService';

interface AddBabyCardProps {
	refetchBabies: () => Promise<void>;
}

const AddBabyCard: React.FC<AddBabyCardProps> = ({ refetchBabies }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [isAdding, setIsAdding] = useState(false);

	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleAddBaby = async (formValues: BabyFormValues) => {
		try {
			setIsAdding(true);
			// Create API payload
			const payload: CreateBabyPayload = {
				name: formValues.name,
				birthDate: formValues.birthDate as Date,
				weight: formValues.weight ? `${formValues.weight}` : undefined,
				gender: formValues.gender === 'boy' ? 'MALE' : 'FEMALE',
			};

			// Call the API to create the baby
			await babyService.createBaby(payload);

			// Refetch babies list instead of using callback
			await refetchBabies();

			// Close the modal after successful creation
			handleCloseModal();
		} catch (error) {
			console.error('Error adding baby:', error);
			// Keep the modal open when there is an error
			// You could add a toast notification here
			// For example: toast.error('No se pudo crear el bebé. Por favor intenta de nuevo.');
		} finally {
			setIsAdding(false);
		}
	};

	return (
		<>
			<Card
				sx={{
					borderRadius: 4,
					overflow: 'hidden',
					height: '100%',
					width: '100%',
					minHeight: 430,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					py: 8,
					backgroundColor: 'background.paper',
					border: '1px dashed rgba(0,0,0,0.1)',
					cursor: 'pointer',
					'&:hover': {
						border: '1px dashed rgba(0,0,0,0.2)',
						backgroundColor: 'background.default',
					},
				}}
				onClick={handleOpenModal}
			>
				<Avatar
					sx={{
						bgcolor: 'background.default',
						width: 80,
						height: 80,
						border: '1px dashed rgba(0,0,0,0.2)',
						mb: 2,
					}}
				>
					<AddIcon color='primary' fontSize='large' />
				</Avatar>

				<Typography
					variant='h6'
					fontWeight='medium'
					color='primary.main'
					sx={{ mb: 1 }}
				>
					Agregar Nuevo Bebé
				</Typography>

				<Typography
					variant='body2'
					color='text.secondary'
					sx={{ maxWidth: 250, textAlign: 'center' }}
				>
					Registra a tu bebé para hacer seguimiento de su crecimiento,
					alimentación y desarrollo
				</Typography>
			</Card>

			<AddBabyModal
				open={modalOpen}
				onClose={handleCloseModal}
				onSubmit={handleAddBaby}
				isSubmitting={isAdding}
			/>
		</>
	);
};

export default AddBabyCard;
