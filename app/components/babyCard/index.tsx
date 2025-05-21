'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
	Box,
	Typography,
	Card,
	CardContent,
	Avatar,
	Button,
	IconButton,
} from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import { ChildCareRounded, DeleteOutline } from '@mui/icons-material';

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
	_id: string;
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
	gender?: 'MALE' | 'FEMALE';
}

interface BabyCardProps {
	baby: Baby;
	onDelete: (baby: Baby) => void;
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
	if (typeof date === 'string') {
		date = new Date(date);
	}

	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	};

	return date.toLocaleDateString('es-ES', options);
};

const BabyCard: React.FC<BabyCardProps> = ({ baby, onDelete }) => {
	const router = useRouter();

	const handleViewDetails = () => {
		router.push(`/bebes/${baby._id}`);
	};

	// Get background color based on baby's gender
	const getBackgroundColor = () => {
		if (!baby.gender) return getRandomColor(); // Fallback to random if no gender

		return baby.gender === 'MALE'
			? 'rgba(167, 226, 255, 0.3)' // Light blue for boys
			: 'rgba(248, 164, 187, 0.3)'; // Light pink for girls
	};

	return (
		<Card
			sx={{
				borderRadius: 4,
				overflow: 'hidden',
				height: '100%',
				width: '100%',
				minHeight: 430,
				position: 'relative',
			}}
		>
			{/* Delete Button */}
			<IconButton
				aria-label='delete'
				sx={{
					position: 'absolute',
					top: 8,
					right: 8,
					zIndex: 1,
					bgcolor: 'rgba(255,255,255,0.8)',
					'&:hover': {
						bgcolor: 'error.light',
						color: 'error.main',
					},
				}}
				onClick={() => onDelete(baby)}
			>
				<DeleteOutline fontSize='small' />
			</IconButton>

			{/* Baby Avatar Section */}
			<Box
				sx={{
					height: 120,
					backgroundColor: getBackgroundColor(),
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
					<ChildCareRounded
						sx={{
							color: baby.gender === 'MALE' ? 'info.main' : 'secondary.main',
							fontSize: 60,
						}}
					/>
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
					onClick={handleViewDetails}
				>
					Ver Detalles
				</Button>
			</CardContent>
		</Card>
	);
};

export default BabyCard;
