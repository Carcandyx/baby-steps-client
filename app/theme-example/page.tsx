'use client';

import React from 'react';
import NavBar from '../components/appNavBar';
import {
	Box,
	Container,
	Typography,
	Button,
	Card,
	CardContent,
	TextField,
	Avatar,
	Divider,
	Paper,
	Chip,
	useTheme,
} from '@mui/material';

export default function ThemeExamplePage() {
	const theme = useTheme();

	return (
		<Box>
			<NavBar userInitials='BS' />

			<Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
				<Typography variant='h3' gutterBottom>
					BabySteps Theme Example
				</Typography>

				<Typography variant='body1' paragraph>
					This page demonstrates the custom theme components for BabySteps.
				</Typography>

				<Divider sx={{ my: 4 }} />

				{/* Colors Section */}
				<Typography variant='h4' gutterBottom>
					Color Palette
				</Typography>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(12, 1fr)',
						gap: 2,
						mb: 4,
					}}
				>
					<Box
						sx={{ gridColumn: { xs: 'span 12', sm: 'span 4', md: 'span 2' } }}
					>
						<Paper
							sx={{
								height: 100,
								bgcolor: theme.palette.primary.main,
								color: theme.palette.primary.contrastText,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
							elevation={0}
						>
							<Typography variant='subtitle2'>Primary</Typography>
							<Typography variant='caption'>#A095FF</Typography>
						</Paper>
					</Box>

					<Box
						sx={{ gridColumn: { xs: 'span 12', sm: 'span 4', md: 'span 2' } }}
					>
						<Paper
							sx={{
								height: 100,
								bgcolor: theme.palette.primary.light,
								color: theme.palette.text.primary,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
							elevation={0}
						>
							<Typography variant='subtitle2'>Primary Light</Typography>
							<Typography variant='caption'>#E8E7FF</Typography>
						</Paper>
					</Box>

					<Box
						sx={{ gridColumn: { xs: 'span 12', sm: 'span 4', md: 'span 2' } }}
					>
						<Paper
							sx={{
								height: 100,
								bgcolor: theme.palette.secondary.main,
								color: theme.palette.secondary.contrastText,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
							elevation={0}
						>
							<Typography variant='subtitle2'>Secondary</Typography>
							<Typography variant='caption'>#F8A4BB</Typography>
						</Paper>
					</Box>

					<Box
						sx={{ gridColumn: { xs: 'span 12', sm: 'span 4', md: 'span 2' } }}
					>
						<Paper
							sx={{
								height: 100,
								bgcolor: theme.palette.background.paper,
								color: theme.palette.text.primary,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
							elevation={0}
						>
							<Typography variant='subtitle2'>Background</Typography>
							<Typography variant='caption'>#FAF8E9</Typography>
						</Paper>
					</Box>

					<Box
						sx={{ gridColumn: { xs: 'span 12', sm: 'span 4', md: 'span 2' } }}
					>
						<Paper
							sx={{
								height: 100,
								bgcolor: theme.palette.info.main,
								color: theme.palette.info.contrastText,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
							elevation={0}
						>
							<Typography variant='subtitle2'>Info</Typography>
							<Typography variant='caption'>#A7E2FF</Typography>
						</Paper>
					</Box>

					<Box
						sx={{ gridColumn: { xs: 'span 12', sm: 'span 4', md: 'span 2' } }}
					>
						<Paper
							sx={{
								height: 100,
								bgcolor: theme.palette.warning.main,
								color: theme.palette.warning.contrastText,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
							elevation={0}
						>
							<Typography variant='subtitle2'>Warning</Typography>
							<Typography variant='caption'>#FFC785</Typography>
						</Paper>
					</Box>
				</Box>

				<Divider sx={{ my: 4 }} />

				{/* Typography Section */}
				<Typography variant='h4' gutterBottom>
					Typography
				</Typography>

				<Box sx={{ mb: 4 }}>
					<Typography variant='h1' gutterBottom>
						Heading 1
					</Typography>
					<Typography variant='h2' gutterBottom>
						Heading 2
					</Typography>
					<Typography variant='h3' gutterBottom>
						Heading 3
					</Typography>
					<Typography variant='h4' gutterBottom>
						Heading 4
					</Typography>
					<Typography variant='h5' gutterBottom>
						Heading 5
					</Typography>
					<Typography variant='h6' gutterBottom>
						Heading 6
					</Typography>
					<Typography variant='subtitle1' gutterBottom>
						Subtitle 1
					</Typography>
					<Typography variant='subtitle2' gutterBottom>
						Subtitle 2
					</Typography>
					<Typography variant='body1' gutterBottom>
						Body 1: The quick brown fox jumps over the lazy dog.
					</Typography>
					<Typography variant='body2' gutterBottom>
						Body 2: The quick brown fox jumps over the lazy dog.
					</Typography>
				</Box>

				<Divider sx={{ my: 4 }} />

				{/* Components Section */}
				<Typography variant='h4' gutterBottom>
					Components
				</Typography>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(12, 1fr)',
						gap: 4,
					}}
				>
					{/* Buttons */}
					<Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
						<Card>
							<CardContent>
								<Typography variant='h5' gutterBottom>
									Buttons
								</Typography>
								<Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
									<Button variant='contained' color='primary'>
										Primary
									</Button>
									<Button variant='contained' color='secondary'>
										Secondary
									</Button>
									<Button variant='contained' disabled>
										Disabled
									</Button>
								</Box>
								<Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
									<Button variant='outlined' color='primary'>
										Primary
									</Button>
									<Button variant='outlined' color='secondary'>
										Secondary
									</Button>
									<Button variant='outlined' disabled>
										Disabled
									</Button>
								</Box>
								<Box sx={{ display: 'flex', gap: 2 }}>
									<Button variant='text' color='primary'>
										Primary
									</Button>
									<Button variant='text' color='secondary'>
										Secondary
									</Button>
									<Button variant='text' disabled>
										Disabled
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Box>

					{/* Text Fields */}
					<Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
						<Card>
							<CardContent>
								<Typography variant='h5' gutterBottom>
									Text Fields
								</Typography>
								<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
									<TextField label='Standard' variant='outlined' />
									<TextField
										label='With Helper Text'
										variant='outlined'
										helperText='Helper text'
									/>
									<TextField
										label='Password'
										type='password'
										variant='outlined'
										defaultValue='password'
									/>
									<TextField
										label='Error'
										variant='outlined'
										error
										helperText='Error message'
									/>
								</Box>
							</CardContent>
						</Card>
					</Box>

					{/* Cards & Paper */}
					<Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
						<Card>
							<CardContent>
								<Typography variant='h5' gutterBottom>
									Cards & Paper
								</Typography>

								<Paper elevation={1} sx={{ p: 2, mb: 2 }}>
									<Typography variant='body2'>
										Paper with elevation 1
									</Typography>
								</Paper>

								<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
									<Typography variant='body2'>
										Paper with elevation 3
									</Typography>
								</Paper>

								<Card sx={{ mb: 2 }}>
									<CardContent>
										<Typography variant='h6' gutterBottom>
											Card Title
										</Typography>
										<Typography variant='body2'>
											Card with content. The styles are defined by the theme.
										</Typography>
									</CardContent>
								</Card>
							</CardContent>
						</Card>
					</Box>

					{/* Avatars & Chips */}
					<Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
						<Card>
							<CardContent>
								<Typography variant='h5' gutterBottom>
									Avatars & Chips
								</Typography>

								<Box
									sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}
								>
									<Avatar>JD</Avatar>
									<Avatar sx={{ bgcolor: theme.palette.primary.main }}>
										BS
									</Avatar>
									<Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
										AB
									</Avatar>
									<Avatar sx={{ bgcolor: theme.palette.info.main }}>MN</Avatar>
								</Box>

								<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
									<Chip label='Primary' color='primary' />
									<Chip label='Secondary' color='secondary' />
									<Chip label='Info' color='info' />
									<Chip label='Success' color='success' />
									<Chip label='Warning' color='warning' />
									<Chip label='Error' color='error' />
									<Chip label='Default' />
									<Chip label='Clickable' onClick={() => {}} />
									<Chip label='Deletable' onDelete={() => {}} />
								</Box>
							</CardContent>
						</Card>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
