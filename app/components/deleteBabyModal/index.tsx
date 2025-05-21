'use client';

import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Box,
	Typography,
	CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteBabyModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	babyName: string;
	isDeleting?: boolean;
}

const DeleteBabyModal: React.FC<DeleteBabyModalProps> = ({
	open,
	onClose,
	onConfirm,
	babyName,
	isDeleting = false,
}) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth='sm'
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: 4,
					p: 1,
				},
			}}
		>
			<Box
				sx={{
					bgcolor: 'error.light',
					p: 2,
					mb: 2,
					borderRadius: '16px 16px 0 0',
				}}
			>
				<DialogTitle sx={{ p: 0, color: 'text.primary', fontWeight: 'bold' }}>
					Eliminar Bebé
				</DialogTitle>
			</Box>

			<DialogContent sx={{ px: 3 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
					<DeleteIcon color='error' sx={{ mr: 2, fontSize: 32 }} />
					<Typography variant='h6' sx={{ fontWeight: 'medium' }}>
						¿Estás seguro?
					</Typography>
				</Box>

				<Typography variant='body1' sx={{ mb: 3 }}>
					Estás a punto de eliminar a <strong>{babyName}</strong>. Esta acción
					no se puede deshacer y se perderá toda la información relacionada.
				</Typography>
			</DialogContent>

			<DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center', gap: 2 }}>
				<Button
					onClick={onClose}
					variant='outlined'
					sx={{
						borderRadius: 30,
						px: 4,
						borderColor: 'rgba(0,0,0,0.2)',
						color: 'text.primary',
					}}
				>
					Cancelar
				</Button>
				<Button
					onClick={onConfirm}
					variant='contained'
					color='error'
					sx={{
						borderRadius: 30,
						px: 4,
						position: 'relative',
					}}
					disabled={isDeleting}
				>
					{isDeleting && (
						<CircularProgress
							size={24}
							sx={{
								position: 'absolute',
								color: 'error.main',
							}}
						/>
					)}
					<span style={{ visibility: isDeleting ? 'hidden' : 'visible' }}>
						Eliminar
					</span>
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteBabyModal;
