'use client';

import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import { elements, button, spacing } from '@/app/styles';

interface SocialLoginProps {
	googleText: string;
	appleText: string;
	dividerText: string;
}

export default function SocialLogin({
	googleText,
	appleText,
	dividerText,
}: SocialLoginProps) {
	return (
		<>
			<Box sx={elements.divider}>
				<Divider sx={{ bgcolor: 'rgba(0,0,0,0.08)' }} />
				<Typography variant='body2' component='span' sx={elements.dividerText}>
					{dividerText}
				</Typography>
			</Box>

			<Box sx={{ display: 'flex', gap: spacing.sm, width: '100%' }}>
				<Button
					variant='outlined'
					fullWidth
					sx={{
						...button.rounded,
						border: '1px solid rgba(0,0,0,0.08)',
						color: 'text.primary',
						fontWeight: 500,
						'&:hover': {
							bgcolor: 'rgba(0,0,0,0.02)',
							borderColor: 'rgba(0,0,0,0.12)',
							boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
						},
					}}
					startIcon={
						<Box sx={{ width: 22, height: 22, position: 'relative' }}>
							<Image src='/google.svg' alt='Google' fill />
						</Box>
					}
				>
					{googleText}
				</Button>

				<Button
					variant='outlined'
					fullWidth
					sx={{
						...button.rounded,
						border: '1px solid rgba(0,0,0,0.08)',
						color: 'text.primary',
						fontWeight: 500,
						'&:hover': {
							bgcolor: 'rgba(0,0,0,0.02)',
							borderColor: 'rgba(0,0,0,0.12)',
							boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
						},
					}}
					startIcon={
						<Box sx={{ width: 22, height: 22, position: 'relative' }}>
							<Image src='/apple.svg' alt='Apple' fill />
						</Box>
					}
				>
					{appleText}
				</Button>
			</Box>
		</>
	);
}
