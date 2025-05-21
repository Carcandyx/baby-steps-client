'use client';

import React from 'react';
import {
	Box,
	Typography,
	Card,
	CardContent,
	Avatar,
	Button,
} from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import AddIcon from '@mui/icons-material/Add';

// Predefined theme colors for baby cards
const CARD_COLORS = [
	'#A095FF', // primary.main - purple
	'#E8E7FF', // primary.light - light purple
	'#F8A4BB', // secondary.main - pink
	'#FFD9E3', // secondary.light - light pink
	'#A7E2FF', // info.main - light blue
	'#97D5AA', // success.main - green
	'#FFC785', // warning.main - amber/orange
];

// Function to get a random color from the theme colors
const getRandomColor = () => {
	const randomIndex = Math.floor(Math.random() * CARD_COLORS.length);
	return CARD_COLORS[randomIndex];
};

// Baby interface
export interface Baby {
	id: number;
	name?: string;
	age?: string;
	activities?: {
		feeding?: Date;
		sleep?: Date;
		diaper?: Date;
	};
	birthDate?: Date;
	weight?: string;
	height?: string;
}

interface BabyCardProps {
	baby?: Baby; // Optional to handle the "Add New Baby" card
	isAddCard?: boolean;
}

// Helper function to format relative time
const getRelativeTime = (date?: Date): string => {
	if (!date) return '-';

	const now = new Date();
	const diffMs = now.getTime() - date.getTime();

	// Convert to minutes
	const diffMinutes = Math.floor(diffMs / (1000 * 60));

	if (diffMinutes < 60) {
		return `${diffMinutes}m atrás`;
	} else if (diffMinutes < 24 * 60) {
		const hours = Math.floor(diffMinutes / 60);
		return `${hours}h atrás`;
	} else {
		const days = Math.floor(diffMinutes / (60 * 24));
		return `${days}d atrás`;
	}
};

// Helper function to format a date nicely
const formatDate = (date?: Date): string => {
	if (!date) return '-';

	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	};

	return date.toLocaleDateString('es-ES', options);
};

const BabyCard: React.FC<BabyCardProps> = ({ baby, isAddCard = false }) => {
	if (isAddCard) {
		return (
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
		);
	}

	// For regular baby cards, baby must be defined
	if (!baby) return null;

	return (
		<Card
			sx={{
				borderRadius: 4,
				overflow: 'hidden',
				height: '100%',
				width: '100%',
				minHeight: 430,
			}}
		>
			{/* Baby Avatar Section */}
			<Box
				sx={{
					height: 120,
					backgroundColor: getRandomColor(),
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'relative',
				}}
			>
				<Avatar
					sx={{
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						width: 80,
						height: 80,
						border: '4px solid white',
					}}
				>
					<Typography variant='h4' component='span' sx={{ color: '#555' }}>
						☺
					</Typography>
				</Avatar>
			</Box>

			<CardContent sx={{ textAlign: 'center', p: 2 }}>
				{/* Name and Age */}
				<Typography variant='h6' fontWeight='bold' sx={{ mb: 0.5 }}>
					{baby.name || '-'}
				</Typography>
				<Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
					{baby.age || '-'}
				</Typography>

				{/* Activity Icons */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-around',
						mb: 2,
						mx: 'auto',
						maxWidth: 280,
					}}
				>
					<Box sx={{ textAlign: 'center' }}>
						<Avatar
							sx={{
								bgcolor: 'success.light',
								mb: 0.5,
								height: 32,
								width: 32,
								mx: 'auto',
							}}
						>
							<SpaIcon sx={{ color: 'success.dark', fontSize: 18 }} />
						</Avatar>
						<Typography variant='caption' display='block'>
							{getRelativeTime(baby.activities?.diaper)}
						</Typography>
					</Box>

					<Box sx={{ textAlign: 'center' }}>
						<Avatar
							sx={{
								bgcolor: 'warning.light',
								mb: 0.5,
								height: 32,
								width: 32,
								mx: 'auto',
							}}
						>
							<RestaurantIcon sx={{ color: 'warning.dark', fontSize: 18 }} />
						</Avatar>
						<Typography variant='caption' display='block'>
							{getRelativeTime(baby.activities?.feeding)}
						</Typography>
					</Box>

					<Box sx={{ textAlign: 'center' }}>
						<Avatar
							sx={{
								bgcolor: 'info.light',
								mb: 0.5,
								height: 32,
								width: 32,
								mx: 'auto',
							}}
						>
							<NightShelterIcon sx={{ color: 'info.dark', fontSize: 18 }} />
						</Avatar>
						<Typography variant='caption' display='block'>
							{getRelativeTime(baby.activities?.sleep)}
						</Typography>
					</Box>
				</Box>

				{/* Baby Details */}
				<Box sx={{ textAlign: 'left', mb: 2 }}>
					<Typography variant='body2' sx={{ mb: 0.5 }}>
						<strong>Fecha de nacimiento:</strong> {formatDate(baby.birthDate)}
					</Typography>
					<Typography variant='body2' sx={{ mb: 0.5 }}>
						<strong>Peso actual:</strong> {baby.weight || '-'}
					</Typography>
					<Typography variant='body2'>
						<strong>Altura actual:</strong> {baby.height || '-'}
					</Typography>
				</Box>

				{/* Action Button */}
				<Button
					variant='contained'
					sx={{
						borderRadius: 30,
						py: 1,
						px: 3,
						bgcolor: 'primary.main',
						color: 'white',
						'&:hover': {
							bgcolor: 'primary.dark',
						},
						width: '100%',
					}}
				>
					Ver Detalles
				</Button>
			</CardContent>
		</Card>
	);
};

export default BabyCard;
