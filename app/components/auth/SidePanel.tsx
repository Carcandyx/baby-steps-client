'use client';

import React from 'react';
import Image from 'next/image';
import {
	Box,
	Typography,
	Card,
	CardContent,
	Avatar,
	useTheme,
	Theme,
} from '@mui/material';
import { spacing, text, card, elements } from '@/app/styles';

interface TestimonialProps {
	quote: string;
	author: string;
	role: string;
	avatarInitials: string;
}

interface FeatureProps {
	features: string[];
	title: string;
}

interface SidePanelProps {
	title?: string;
	subtitle: string;
	illustration: string;
	testimonial?: TestimonialProps;
	features?: FeatureProps;
}

export default function SidePanel({
	title = 'BabySteps',
	subtitle,
	illustration,
	testimonial,
	features,
}: SidePanelProps) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: { xs: '40vh', md: '100%' },
				padding: { xs: spacing.md, md: spacing.lg },
				position: 'relative',
				height: '100%',
				textAlign: 'center',
			}}
		>
			{/* Logo and Title */}
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
				<Box sx={elements.logo}>
					<Image src='/logo.svg' alt='BabySteps Logo' fill priority />
				</Box>
			</Box>
			<Typography
				variant='h3'
				component='h1'
				sx={{
					...text.pageTitle,
					...text.gradient,
				}}
			>
				{title}
			</Typography>
			<Typography
				variant='body1'
				sx={{
					...text.subtitle,
					maxWidth: '340px',
				}}
			>
				{subtitle}
			</Typography>

			{/* Illustration */}
			<Box sx={elements.illustration}>
				<Image src={illustration} alt='BabySteps Illustration' fill priority />
			</Box>

			{/* Testimonial or Feature List */}
			{testimonial && (
				<Card sx={card.default}>
					<CardContent sx={card.content}>
						<Typography
							component='div'
							sx={{
								fontSize: '2rem',
								color: theme.palette.primary.main,
								mb: spacing.sm,
								fontFamily: 'serif',
								fontWeight: 'bold',
								lineHeight: 0.5,
							}}
						>
							&ldquo;
						</Typography>
						<Typography
							variant='body2'
							sx={{ mb: spacing.md, fontStyle: 'italic' }}
						>
							{testimonial.quote}
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Avatar sx={elements.avatar}>{testimonial.avatarInitials}</Avatar>
							<Box sx={{ ml: spacing.sm, textAlign: 'left' }}>
								<Typography variant='subtitle2' fontWeight={600}>
									{testimonial.author}
								</Typography>
								<Typography variant='caption' color='text.secondary'>
									{testimonial.role}
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</Card>
			)}

			{features && (
				<Card sx={card.default}>
					<CardContent sx={card.content}>
						<Typography variant='h6' sx={text.sectionTitle}>
							{features.title}
						</Typography>
						<Box
							sx={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}
						>
							{features.features.map((feature, index) => (
								<Box
									key={index}
									sx={{
										display: 'flex',
										alignItems: 'flex-start',
										gap: spacing.sm,
									}}
								>
									<Box
										sx={{
											width: 24,
											height: 24,
											borderRadius: '50%',
											bgcolor: getFeatureColor(index, theme),
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											flexShrink: 0,
											mt: 0.5,
											boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
										}}
									>
										<Typography
											variant='caption'
											sx={{
												color: '#fff',
												fontWeight: 'bold',
												fontSize: '0.75rem',
												lineHeight: 1,
											}}
										>
											✓
										</Typography>
									</Box>
									<Typography variant='body2' sx={{ textAlign: 'left' }}>
										{feature}
									</Typography>
								</Box>
							))}
						</Box>
					</CardContent>
				</Card>
			)}
		</Box>
	);
}

// Helper function to get different colors for feature checkmarks
function getFeatureColor(index: number, theme: Theme) {
	const colors = [
		theme.palette.success.main,
		theme.palette.warning.main,
		theme.palette.error.main,
		theme.palette.info.main,
	];
	return colors[index % colors.length];
}
